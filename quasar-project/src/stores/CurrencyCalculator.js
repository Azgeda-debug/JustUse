import { defineStore } from 'pinia';
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import axios from "axios";

export const useCurrencyCalculatorStore = defineStore('currencyCalculatorStore', () => {

    const $q = useQuasar()

    const formData = ref({
        baseCurrency: "",
        targetCurrency: "",
        amount: "",
    })

    const apiKey = "e00111ca9e407d19f8c5f3ba";

    const options = ref([]);

    const getSupportedCodes = async () => {
        await axios
            .get(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
            .then((data) => {
                options.value = data.data.supported_codes;
            });
    };

    const conversion = ref("");
    const conversionRate = ref("");
    const getExchange = async () => {
        if (formData.value.baseCurrency && formData.value.targetCurrency && formData.value.amount) {
            await axios
                .get(
                    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${formData.value.baseCurrency[0]}/${formData.value.targetCurrency[0]}/${formData.value.amount}`
                )
                .then((data) => {
                    conversion.value =(data.data.conversion_result).toFixed(2);
                    conversionRate.value = data.data.conversion_rate
                });
        } else {
            $q.notify({
                type: 'negative',
                message: 'Fill in all fields'
            })
        }
    }


    return {
        formData,
        options,
        conversion,
        conversionRate,
        getExchange,
        getSupportedCodes,
    }
});
