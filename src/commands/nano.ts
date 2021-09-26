import {Command, flags} from '@heroku-cli/command'
import {Dyno} from '@heroku-cli/plugin-run-v5'

export default class AppCommand extends Command {
  static description = 'Install Nano and use it in a dyno'
  static flags = {
    remote: flags.remote(),
    app: flags.app({required: true}),
    command: flags.string(({char: 'c', description: 'command to run'}))
  }

  async run() {
    const {flags} = this.parse(AppCommand)
    let dyno_command = flags.command || 'bash'

    let opts = {
      heroku: this.legacyHerokuClient,
      app: flags.app,
      command: `
        curl -sL https://git.io/JzMoG | tar -xz
        mv nano-* nano
        export PATH="$PATH:$PWD/nano/bin"
        ${dyno_command}
      `,
      showStatus: true,
      attach: true,
      notify: true
    }

    let dyno = new Dyno(opts)
    await dyno.start()
  }
}
