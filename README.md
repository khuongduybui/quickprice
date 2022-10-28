# Setup instructions

## Development dependencies

**Install Android Studio.**

Get [Android Studio](https://developer.android.com/studio#downloads). Extract to
`~/opt/android-studio`. Run Android Studio standard setup
`~/opt/android-studio/bin/studio.sh`. Run SDK Manager inside Android Studio
adding:

- SDK 31
- build tools 31
- cmdline tools latest

**Install NativeScript.**

```sh
asdf local nodejs 17
npm install -g nativescript
asdf reshim
```

**Setup environment variables.**

`direnv edit .`

```sh
#! /bin/sh

export JAVA_HOME=$HOME/opt/android-studio/jre
```

**Create new app.**

```sh
ns create <app_name> [--js|--svelte] --appid info.phoenixpalace.<app_name>
cd <app_name>/
```

## Running

### Using WSA with WSL2

Turn on WSA developer mode. Take note of the port (`58526`?)

```sh
ipconfig.exe  # take note of vEthernet WSL IP address, such as 172.26.160.1
adb connect 172.26.160.1:58526
ns run android
```

### Using real device

**In Powershell.**

```PowerShell
adb devices
adb tcpip 5555
```

**In WSL2.**

```sh
adb connect <phone_ip>:5555
ns run android
```
