import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { defineStore } from "pinia";
import type { Shop, ShopDetailed } from '@apiTypes/shop'; 

export const useShopStore = defineStore('shop', {
    state: (): { shops: Shop[], isLoading: boolean, isRefreshing: boolean, isCacheClearing: boolean, shop: ShopDetailed|null } => ({
        isLoading: false,
        isRefreshing: false,
        isCacheClearing: false,
        shops: [],
        shop: null,
    }),
    actions: {
        async createShop(teamId: number, payload: any) {
            this.isLoading = true;
            payload.shop_url = payload.shop_url.replace(/\/+$/, '');
            await fetchWrapper.post(`/team/${teamId}/shops`, payload);
            this.isLoading = false;

            await this.loadShops();
        },

        async loadShops() {
            this.isLoading = true;
            const shops = await fetchWrapper.get('/account/me/shops') as Shop[];
            this.isLoading = false;

            const enrichedShops = this.setShopsInitials(shops);

            this.shops = enrichedShops;
        },

        async loadShop(teamId: number, shopId: number) {
            this.isLoading = true;
            this.shop = await fetchWrapper.get(`/team/${teamId}/shop/${shopId}`) as ShopDetailed;
            this.isLoading = false;
        },
        
        async updateShop(teamId: number, id: number, payload: any) {
            if ( payload.shop_url ) {
                payload.shop_url = payload.shop_url.replace(/\/+$/, '');
            }
            await fetchWrapper.patch(`/team/${teamId}/shop/${id}`, payload);

            await this.loadShop(teamId, id);
        },

        async refreshShop(teamId: number, id: number) {
            this.isRefreshing = true;
            await fetchWrapper.post(`/team/${teamId}/shop/${id}/refresh`);
            this.isRefreshing = false;
        },

        async clearCache(teamId: number, id: number) {
            this.isCacheClearing = true;
            await fetchWrapper.post(`/team/${teamId}/shop/${id}/clear_cache`);
            this.isCacheClearing = false;
        },

        async delete(teamId: number, shopId: number) {
            await fetchWrapper.delete(`/team/${teamId}/shop/${shopId}`);
        },

        setShopsInitials(shops: Shop[]) {
            return shops?.map(shop => ({
                ...shop,
                initials: this.getShopInitias(shop.name)
            }));
        },

        getShopInitias(name: string) {
            let initials = name.split(/\s/).slice(0,2).reduce((response,word)=> response+=word.slice(0,1),'');

            if (initials && initials.length > 1) {
                return initials.toUpperCase();
            }

            return name.slice(0,2).toUpperCase();
        }
    }
})