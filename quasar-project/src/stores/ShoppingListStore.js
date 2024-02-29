import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db } from 'boot/firebase'
import { ref as dbRef, set, get, onChildAdded, remove, update, increment, onChildChanged } from "firebase/database";
import { useUserStore } from './userStore';
import { uid, useQuasar } from 'quasar';

export const useShoppingListStore = defineStore('shoppingListStore', () => {

    const $q = useQuasar()

    const userStore = useUserStore()

    const showNewShopDialog = vueRef(false)
    const chooseIconDialog = vueRef(false)

    const shopIcons = vueRef([
        {
            name: 'chair',
            title: 'Furniture Shop'
        },
        {
            name: 'vaccines',
            title: 'Pharmacy'
        },
        {
            name: 'toys',
            title: 'Toy Shop'
        },
        {
            name: 'bakery_dining',
            title: 'Bakery'
        },
        {
            name: 'album',
            title: 'Music Shop'
        },
    ])

    const newShop = vueRef({
        name: '',
        icon: '',
    })

    const getUserId = () => {
        return userStore.userDetails.id
    }

    const getShopId = () => {
        return selectedShop.value.shopId
    }

    const firebaseAddShop = () => {
        const userId = getUserId()
        const shopId = uid()

        const addShop = () => {
            set(dbRef(db, `users/${userId}/shopping/shops/${shopId}`), {
                name: newShop.value.name,
                icon: newShop.value.icon,
                totalProducts: 0,
                boughtProducts: 0,
                productsToBuyTotalPrice: 0,
                boughtProductsTotalPrice: 0,
            })

            newShop.value = {
                name: '',
                icon: '',
            }
        }

        if (Object.keys(shops.value).length) {
            let shopAlreadyExists = false;

            for (const key in shops.value) {
                if (shops.value[key].name.toLowerCase() == newShop.value.name.toLowerCase()) {
                    shopAlreadyExists = true
                }
            }

            if (shopAlreadyExists) {
                $q.notify({
                    type: 'negative',
                    message: 'The shop has already been added.'
                })
            } else {
                addShop()
            }

        } else {
            addShop()
        }
    }

    const shops = vueRef({})
    const firebaseGetShops = () => {
        const userId = getUserId()

        onChildAdded(dbRef(db, `users/${userId}/shopping/shops`), snapshot => {
            shops.value[snapshot.key] = snapshot.val()
        })

        onChildChanged(dbRef(db, `users/${userId}/shopping/shops`), snapshot => {
            shops.value[snapshot.key] = snapshot.val()
        })
    }

    const firebaseDeleteShop = (shopId) => {
        const userId = getUserId()

        $q.dialog({
            dark: true,
            title: 'Are you sure?',
            message: "Deleted shop cannot be restored. The cost chart for this shop will also not be available.",
            cancel: {
                color: 'red'
            },
            ok: {
                color: 'primary'
            }
        }).onOk(() => {
            if (shops.value[shopId]) delete shopChart.value[shops.value[shopId].name]

            delete shops.value[shopId]
            remove(dbRef(db, `users/${userId}/shopping/shops/${shopId}`))
        }).onCancel(() => {

        })
    }

    const openCurrentShopDialog = vueRef(false)
    const selectedShop = vueRef({})

    const newProductDialog = vueRef(false)
    const newProduct = vueRef({
        name: '',
        price: '',
        quantity: '',
    })

    const addNewProduct = () => {
        const userId = getUserId()
        const shopId = getShopId()
        const productId = uid()

        if (newProduct.value.name && newProduct.value.price) {
            set(dbRef(db, `users/${userId}/shopping/shops/${shopId}/products/${productId}`), {
                name: newProduct.value.name,
                price: newProduct.value.price,
                quantity: newProduct.value.quantity,
                completed: false,
            }).then(() => {
                const updates = {}
                updates[`users/${userId}/shopping/shops/${shopId}/totalProducts`] = increment(1)
                updates[`users/${userId}/shopping/shops/${shopId}/productsToBuyTotalPrice`] = increment(parseInt(newProduct.value.price))

                update(dbRef(db), updates)

                newProduct.value = {
                    name: '',
                    price: '',
                    quantity: '',
                }

                $q.notify({
                    type: 'positive',
                    message: 'Product added'
                })
            })
        }
    }

    const products = vueRef({})
    const firebaseGetProducts = () => {
        const userId = getUserId()
        const shopId = getShopId()

        onChildAdded(dbRef(db, `users/${userId}/shopping/shops/${shopId}/products`), snapshot => {
            products.value[snapshot.key] = snapshot.val()
        })

    }

    const firebaseClearProducts = () => {
        products.value = {}
    }

    const firebaseDeleteProduct = (productId) => {
        const userId = getUserId()
        const shopId = getShopId()

        $q.dialog({
            dark: true,
            title: 'Are you sure?',
            cancel: {
                color: 'red',
            },
            ok: {
                color: 'primary',
            },
        }).onOk(() => {
            get(dbRef(db, `users/${userId}/shopping/shops/${shopId}/products/${productId}`)).then((snapshot) => {
                const updates = {}

                if (snapshot.val().completed) {
                    updates[`users/${userId}/shopping/shops/${shopId}/boughtProducts`] = increment(-1)
                    updates[`users/${userId}/shopping/shops/${shopId}/totalProducts`] = increment(-1)
                    updates[`users/${userId}/shopping/shops/${shopId}/boughtProductsTotalPrice`] = increment(-snapshot.val().price)
                } else {
                    updates[`users/${userId}/shopping/shops/${shopId}/totalProducts`] = increment(-1)
                    updates[`users/${userId}/shopping/shops/${shopId}/productsToBuyTotalPrice`] = increment(-snapshot.val().price)
                }

                update(dbRef(db), updates)
            })

            delete products.value[productId]
            remove(dbRef(db, `users/${userId}/shopping/shops/${shopId}/products/${productId}`))
        }).onCancel(() => {

        })
    }

    const productBought = (product, key) => {
        const userId = getUserId()
        const shopId = getShopId()
        const productId = key

        update((dbRef(db, `users/${userId}/shopping/shops/${shopId}/products/${productId}`)), {
            completed: product.completed
        })

        if (product.completed) {
            const updates = {}
            updates[`users/${userId}/shopping/shops/${shopId}/boughtProducts`] = increment(1)
            updates[`users/${userId}/shopping/shops/${shopId}/boughtProductsTotalPrice`] = increment(parseInt(product.price))
            updates[`users/${userId}/shopping/shops/${shopId}/productsToBuyTotalPrice`] = increment(-parseInt(product.price))

            update(dbRef(db), updates)
        }
        else {
            const updates = {}
            updates[`users/${userId}/shopping/shops/${shopId}/boughtProducts`] = increment(-1)
            updates[`users/${userId}/shopping/shops/${shopId}/boughtProductsTotalPrice`] = increment(-parseInt(product.price))
            updates[`users/${userId}/shopping/shops/${shopId}/productsToBuyTotalPrice`] = increment(parseInt(product.price))

            update(dbRef(db), updates)
        }
    }

    const showChartDialog = vueRef(false)
    const shopChart = vueRef({})

    const firebaseGetChart = () => {
        Object.keys(shops.value).forEach(shopId => {
            const key = `${shops.value[shopId].name}`

            shopChart.value[key] = shops.value[shopId].boughtProductsTotalPrice
        })
    };

    return {
        shops,
        newShop,
        shopIcons,
        chooseIconDialog,
        showNewShopDialog,
        selectedShop,
        openCurrentShopDialog,
        newProductDialog,
        newProduct,
        products,
        showChartDialog,
        shopChart,
        firebaseAddShop,
        firebaseGetShops,
        firebaseDeleteShop,
        addNewProduct,
        firebaseGetProducts,
        firebaseClearProducts,
        firebaseDeleteProduct,
        productBought,
        firebaseGetChart,
    }
});
