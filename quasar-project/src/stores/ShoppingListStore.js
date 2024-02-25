import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue'
import { db } from 'boot/firebase'
import { ref as dbRef, set, onChildAdded, remove, update, increment, onChildChanged } from "firebase/database";
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

    const firebaseAddShop = () => {
        const userId = getUserId()
        const shopId = uid()

        if (newShop.value.name) {
            set(dbRef(db, `users/${userId}/shopping/shops/${shopId}`), {
                name: newShop.value.name,
                icon: newShop.value.icon,
                totalProducts: 0,
                completedProducts: 0,
            })
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
            message: "Deleted shop can't be restored",
            cancel: {
                color: 'red'
            },
            ok: {
                color: 'primary'
            }
        }).onOk(() => {
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
        const shopId = selectedShop.value.shopId
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

                update(dbRef(db), updates)

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
        const shopId = selectedShop.value.shopId

        onChildAdded(dbRef(db, `users/${userId}/shopping/shops/${shopId}/products`), snapshot => {
            products.value[snapshot.key] = snapshot.val()
        })

    }

    const firebaseClearProducts = () => {
        products.value = {}
    }

    const firebaseDeleteProduct = (productId) => {
        const userId = getUserId()
        const shopId = selectedShop.value.shopId

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
            delete products.value[productId]
            remove(dbRef(db, `users/${userId}/shopping/shops/${shopId}/products/${productId}`))

            const updates = {}
            updates[`users/${userId}/shopping/shops/${shopId}/totalProducts`] = increment(-1)

            update(dbRef(db), updates)

        }).onCancel(() => {

        })
    }

    const productBought = (product, key) => {
        const userId = getUserId()
        const shopId = selectedShop.value.shopId
        const productId = key

        update((dbRef(db, `users/${userId}/shopping/shops/${shopId}/products/${productId}`)), {
            completed: product.completed
        })

        if (product.completed) {
            const updates = {}
            updates[`users/${userId}/shopping/shops/${shopId}/completedProducts`] = increment(1)

            update(dbRef(db), updates)
        }
        else {
            const updates = {}
            updates[`users/${userId}/shopping/shops/${shopId}/completedProducts`] = increment(-1)

            update(dbRef(db), updates)
        }
    }

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

        firebaseAddShop,
        firebaseGetShops,
        firebaseDeleteShop,
        addNewProduct,
        firebaseGetProducts,
        firebaseClearProducts,
        firebaseDeleteProduct,
        productBought,
    }
});
