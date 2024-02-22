import { defineStore } from 'pinia';
import { ref, watch } from 'vue'

export const usePasswordStore = defineStore('passwordStore', () => {
    const password = ref("");
    const passwordLength = ref(12);

    const uppercase = ref(true);
    const lowercase = ref(true);
    const numbers = ref(true);
    const symbols = ref(true);

    const characters = ref(4);

    const generatePassword = () => {
        const uppercaseChars = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
        ];
        const lowercaseChars = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
        ];
        const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const symbolChars = [
            "!",
            "@",
            "#",
            "$",
            "%",
            "^",
            "&",
            "*",
            "(",
            ")",
            "-",
            "_",
            "+",
            "=",
            "<",
            ">",
            "?",
        ];

        let newPassword = "";
        let shouldGeneratePassword = false;

        const getRandomPassword = () => {
            newPassword = "";

            for (let i = 0; i < passwordLength.value && shouldGeneratePassword; i++) {
                const randomIndex = Math.floor(Math.random() * avilableChars.length);
                newPassword += avilableChars[randomIndex];
            }
            return newPassword;
        };

        let avilableChars = [];

        if (uppercase.value) {
            avilableChars = [...avilableChars, ...uppercaseChars];
            shouldGeneratePassword = true;
        }

        if (lowercase.value) {
            avilableChars = [...avilableChars, ...lowercaseChars];
            shouldGeneratePassword = true;
        }

        if (numbers.value) {
            avilableChars = [...avilableChars, ...numberChars];
            shouldGeneratePassword = true;
        }

        if (symbols.value) {
            avilableChars = [...avilableChars, ...symbolChars];
            shouldGeneratePassword = true;
        }

        password.value = getRandomPassword();
    };

    watch(passwordLength, (newVal) => {
        if (newVal) {
            generatePassword();
        }
    });

    return {
        password,
        characters,
        passwordLength,
        uppercase,
        lowercase,
        numbers,
        symbols,
        generatePassword,
    }
});
