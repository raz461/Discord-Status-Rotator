# Discord Status Changer
Simple script to change your discord status and presence every x seconds using discord api.

## Configuration
1. Add your token in the `config.json` file.
2. Change the delay as you wish in the `config.json` file in seconds.
3. Change emojies and status text as you wish in the `config.json` file.
4. Run the script.

# Misc
- For custom emojies, make sure you are in the server where the emojies are.

## Config
```json
{
    "token":"YOUR_TOKEN", // Your discord token
    "switchInterval": 5, // Delay in seconds
    "presences": ["online","idle","dnd","invisible"], // Presence
    "emojiePosition": 1, // Emojie position 0 = Left | 1 = Right
    "emojies":[
        "<:bof:1255888207506051165>",
        "😂",
        "😍",
        "😊",       // Emojies
        "😁",
        "😎",
        "😜",
        "😋"
    ],
    "statusText": [
        "Playing undesync.gg",
        "Cheap nitro: undesync.gg",
        "Join undesync.gg",     // Status texts
        "discord.gg/undesync",
        "discord.gg/undesync"
    ]
}
```
#
### Example
![Example](https://i.imgur.com/gcoWZOt.png)

[Discord](https://discord.gg/undesync)