# crenvo
A Laravel-inspired, zero-dependency, TypeScript-ready CLI and Library for env file encryption

```crenvo = crypto + env```

## 1. The idea

```artisan``` provides ```php artisan key:generate``` to support env variable encryption.

NodeJS provides a ton of tools to perform encryption and file manipulation without the need of extra libraries.

With those 2 thoughts in mind, I created this package to deal with a task many may have to deal with.

## 2. CLI commands

### ```npx crenv code:generate --envFile <path>```

Run this command to create a ```ENC_CODE``` in your env file.

Use ```--envFile```/```-e``` option to specify your file path. By default, it is ```.env``` in the project root directory.

### ```npx crenv encrypt <input> --envFile <path> --writeAs <field>```

Run this command to encrypt a string value using the code in env the file and print out the result.

Use ```--envFile```/```-e``` option to specify your file path. By default, it is ```.env``` in the project root directory.

Use ```--writeAs```/```-w``` option to write the encrypted into the env file under the given variable name.

### ```npx crenv decrypt <input> --envFile <path>```

Run this command to decrypt a string value using the code in env the file and print out the result.

Use ```--envFile```/```-e``` option to specify your file path. By default, it is ```.env``` in the project root directory.

## 3. Utility functions

### ```setCode(envFile?: string = '.env') => void```

Create a ```ENC_CODE``` in your env file.

### ```getCode(envFile?: string = '.env') => Promise<string>```

Retrieve the value of ```ENC_CODE``` in your env file.

### ```getKeyIv(envFile?: string = '.env') => Promise<string[]>```

Retrieve the Encryption KEY and IV from decrypting the value of ```ENC_CODE``` in your env file.

### ```encrypt(str: string, envFile?: string = '.env') => Promise<string>```

Encrypt a string value using the code in env the file.

### ```encryptAndSet(str: string, field: string, envFile?: string = '.env') => Promise<string>```

Encrypt a string value using the code in env the file and write it under the name specified by ```field```.

### ```decrypt(str: string, envFile?: string = '.env') => Promise<string>```

Decrypt a string value using the code in env the file.
