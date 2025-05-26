# goit-node-cli


## Install

```bash
npm install
```

## Usage

Show list of contacts
```bash
node index.js -a list
```

Show contact by id
```bash
node index.js -a get -i <id>
```

Add contact
```bash
node index.js -a add -n <name> -e <email> -p <phone>
```

Remove contact
```bash
node index.js -a remove -i <id>
```

