# heroku-nano

A Heroku plugin that allows you to use nano in a dyno

## Installation

```bash
heroku plugins:install heroku-nano
```

## Usage

```bash
heroku nano -a <app-name>
```

This will install nano on your dyno and start a bash shell with `nano` installed on your `$PATH`

You can then open any file in the dyno with nano like so:

```bash
nano /path/to/file
```

## Running another command instead of bash

You can set a command other than `bash` to be run:

```bash
heroku nano -c 'rails console' -a <app-name>
```

## License

MIT
