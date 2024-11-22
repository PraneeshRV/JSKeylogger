'use strict';

//loading special key mappings from keys.json
let specialKeys={}

fetch('keys.json')
    .then(response => response.json())
    .then(data => {
        specialKeys=data;
    })
    .catch (error => console.error('Error loading keys from keys.json:', error));

const textarea = document.getElementById('logArea');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const status = document.getElementById('status');
let isRecording = false;

// Function to determine if a character is alphanumeric
function isAlphanumeric(char){
    return /^[0-9a-zA-Z]+$/.test(char);
}

let modifierKeys={
    'shift': false,
    'control': false,
    'alt': false,
};

// Check in all categories of special keys
function getSpecialKey(key){
    for (const category in specialKeys){
        if (specialKeys[category][key])
            return specialKeys[category][key];
    }
    return null;
}

function handlekeyPress(event){
    if (!isRecording) return;

    let formattedKey = '';

    //check for modifier keys
    if (event.key.toLowerCase() in modifierKeys){
        modifierKeys[event.key.toLowerCase()] = true;
        return;
    }

    //handle special keys
    const specialKey = getSpecialKey(event.key);
    if (specialKey)
        formattedKey = `<${event.key}>`;
    else if (event.key === 'Enter')
        formattedKey = `<Enter>`;
    else if (event.key.length=2 && event.key.startsWith('F'))
        formattedKey = `<${event.key}>`;
    else if (isAlphanumeric(event.key))
        formattedKey = event.key;
    else 
        formattedKey = `<${event.key}>`;

    

const activeModifiers = Object.entries(modifierKeys)
    .filter(([_, active])=> active)
    .map(([key, _]) => key.toUpperCase());

if (activeModifiers.length >0){
    formattedKey = `[${activeModifiers.join('+')}+${formattedKey}]`;
}

//Write to log
textarea.value += formattedKey;
textarea.scrollTop = textarea.scrollHeight;

//reset modifier keys


}