export const state = () => ({
    currentStuffType: '',
    status: false,
    database: [],
    currentProgress: 0,
    totalProgress: 0,
    currentCategoryList: [],
    totalCategoryList: [],
    currentStuffProgress: 0,
    totalStuffProgress: 0,
    syncStartStatus: false,
    originDataStatus: false,
    categoryTreeStatus: false,
    filterParamStatus: false,
    productSyncStatus: false,
    rscCurrentProgress: 0,
    rscTotalProgress: 0,
    rscCurrentCategoryList: [],
    rscTotalCategoryList: [],
    rscCurrentStuffProgress: 0,
    rscTotalStuffProgress: 0,
    productCountList: {}
})

export const getters = {
    currentStuffType(state) {
        return state.currentStuffType;
    },
    status(state) {
        return state.status;
    },
    database(state) {
        return state.database;
    },
    currentProgress(state) {
        return state.currentProgress;
    },
    totalProgress(state) {
        return state.totalProgress;
    },
    currentCategoryList(state) {
        return state.currentCategoryList;
    },
    totalCategoryList(state) {
        return state.totalCategoryList;
    },
    currentStuffProgress(state) {
        return state.currentStuffProgress;
    },
    totalStuffProgress(state) {
        return state.totalStuffProgress;
    },
    syncStartStatus(state) {
        return state.syncStartStatus;
    },
    originDataStatus(state) {
        return state.originDataStatus;
    },
    categoryTreeStatus(state) {
        return state.categoryTreeStatus;
    },
    filterParamStatus(state) {
        return state.filterParamStatus;
    },
    productSyncStatus(state) {
        return state.productSyncStatus;
    },
    rscCurrentProgress(state) {
        return state.rscCurrentProgress;
    },
    rscTotalProgress(state) {
        return state.rscTotalProgress;
    },
    rscCurrentCategoryList(state) {
        return state.rscCurrentCategoryList;
    },
    rscTotalCategoryList(state) {
        return state.rscTotalCategoryList;
    },
    rscCurrentStuffProgress(state) {
        return state.rscCurrentStuffProgress;
    },
    rscTotalStuffProgress(state) {
        return state.rscTotalStuffProgress;
    },
    productCountList(state) {
        return state.productCountList;
    },
}

export const mutations = {
    setCurrentStuffType(state, payload) {
        state.currentStuffType = payload
    },
    setStatus(state, payload) {
        state.status = payload;
    },
    setDBOrigin(state, payload) {
        state.database = payload;
    },
    setCurProgress(state, payload) {
        state.currentProgress = payload;
    },
    setTotalProgress(state, payload) {
        state.totalProgress = payload;
    },
    setCurProgressList(state, payload) {
        state.currentCategoryList = payload;
    },
    setTotalProgressList(state, payload) {
        state.totalCategoryList = payload;
    },
    setCurrentStuffProgress(state, payload) {
        state.currentStuffProgress = payload;
    },
    setTotalStuffProgress(state, payload) {
        state.totalStuffProgress = payload;
    },
    setSyncStartStatus(state, payload) {
        state.syncStartStatus = payload;
    },
    setOriginDataStatus(state, payload) {
         state.originDataStatus = payload;
    },
    setCategoryTreeStatus(state, payload) {
         state.categoryTreeStatus = payload;
    },
    setFilterParamStatus(state, payload) {
         state.filterParamStatus = payload;
    },
    setProductSyncStatus(state, payload) {
         state.productSyncStatus = payload;
    },
    clearAllStatus(state, payload) {
        state.database = [];
        state.currentProgress = 0;
        state.totalProgress = 0;
        state.currentCategoryList = [];
        state.totalCategoryList = [];
        state.syncStartStatus = false;
        state.originDataStatus = false;
        state.categoryTreeStatus = false;
        state.filterParamStatus = false;
        state.productSyncStatus = false;
    },
    setRscCurrentProgress(state, payload) {
        state.rscCurrentProgress = payload
    },
    setRscTotalProgress(state, payload) {
        state.rscTotalProgress = payload
    },
    setRscCurrentCategoryList(state, payload) {
        state.rscCurrentCategoryList = payload
    },
    setRscTotalCategoryList(state, payload) {
        state.rscTotalCategoryList = payload
    },
    setRscCurrentStuffProgress(state, payload) {
        state.rscCurrentStuffProgress = payload
    },
    setRscTotalStuffProgress(state, payload) {
        state.rscTotalStuffProgress = payload
    },
    setProductCountList(state, payload) {
        state.productCountList = payload;
    },
}

export const actions = {
    async getPreRequest(context, payload) {
        const { commit } = context;
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}status/pre-request`);
            console.log('getPreRequest succeed', response)

            if (response) {
                commit('setOriginDataStatus', response.originStatus)
                commit('setCategoryTreeStatus', response.catagoryStatus)
                commit('setFilterParamStatus', response.paramStatus)
            }
        } catch (err) {
            console.error('constructOriginTree failed', err)
        }
    },
    async constructOriginTree(context, payload) {

        const { commit } = context;
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}status/origin`);
            console.log('constructOriginTree succeed', response)

            if (response && (response?.message !== 'no_data')) {
                commit('setDBOrigin', JSON.parse(response.message))
                commit('setStatus', true)
            }
        } catch (err) {
            console.error('constructOriginTree failed', err)
        }
    },
    setDBStatus(context, payload) {
        const { commit } = context;
        commit('setStatus', payload)
    },
    async syncInitialProgress(context, payload) {
        const { commit } = context;
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}status/current-process`);
            console.log('syncInitialProgress succeed', response)
            if (response) {
                commit('setCurProgress', (response?.current_plist || []).length);
                commit('setTotalProgress', (response?.all_plist || []).length);
                commit('setCurProgressList', response?.current_plist || []);
                commit('setTotalProgressList', response?.all_plist || []);
            }
        } catch (err) {
            console.error('syncInitialProgress failed', err)
        }
    },
    async syncCurrentProgress(context, payload) {
        const { commit } = context;
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}status/current-process`);
            // console.log('syncCurrentProgress succeed', response)
            if (response) {
                commit('setCurProgress', (response?.current_plist || []).length);
                commit('setCurProgressList', response?.current_plist || []);
                commit('setCurrentStuffProgress', (response?.cur_slist || []).length);
                commit('setTotalStuffProgress', (response?.tar_slist || []).length);
            }
        } catch (err) {
            console.error('syncCurrentProgress failed', err)
        }
    },
    async syncRscInitialProgress(context, payload) {
        const { commit } = context;
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}status/current-rsc-process`);
            console.log('syncInitialProgress succeed', response)
            if (response) {
                commit('setRscCurrentProgress', (response?.current_plist || []).length);
                commit('setRscTotalProgress', (response?.all_plist || []).length);
                commit('setRscCurrentCategoryList', response?.current_plist || []);
                commit('setRscTotalCategoryList', response?.all_plist || []);
            }
        } catch (err) {
            console.error('syncInitialProgress failed', err)
        }
    },
    async syncRscCurrentProgress(context, payload) {
        const { commit } = context;
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}status/current-rsc-process`);
            // console.log('syncCurrentProgress succeed', response)
            if (response) {
                commit('setRscCurProgress', (response?.current_plist || []).length);
                commit('setRscCurProgressList', response?.current_plist || []);
                commit('setRscCurrentStuffProgress', (response?.cur_slist || []).length);
                commit('setRscTotalStuffProgress', (response?.tar_slist || []).length);
            }
        } catch (err) {
            console.error('syncCurrentProgress failed', err)
        }
    },
    async startDBSync(context, payload) {
        const { commit } = context;
        const { list, type } = payload
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}operation/start`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ list, type })
            });
            console.log('startDBSync succeed', response)
            if (response) {
                commit('setCurrentStuffType', type);
                commit('setSyncStartStatus', true);
            }
        } catch (err) {
            console.error('startDBSync failed', err)
        }        
    },
    async pauseDBSync(context, payload) {
        const { commit } = context;
        // useFetch from nuxt 3
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}operation/pause`);
            console.log('pauseDBSync succeed', response)
            if (response) {
                commit('setCurrentStuffType', "");
                commit('setSyncStartStatus', false);
            }
        } catch (err) {
            console.error('pauseDBSync failed', err)
        }        
    },
    async originDataSync(context, payload) {
        const { commit } = context;
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}origin`)
            if (response) {
                commit('setDBOrigin', JSON.parse(response.message))
                commit('setOriginDataStatus', true);
            }
        } catch (err) {
            console.error('originDataSyncProcess failed', err)
        }
    },
    async originDataReSync(context, payload) {
        const { commit } = context;
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}re-origin`)
            if (response) {

                commit('setOriginDataStatus', true);
            }
        } catch (err) {
            console.error('originDataReSyncProcess failed', err)
        }
    },
    async catagoryTreeSync(context, payload) {
        const { commit } = context;
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}construct-tree`)
            if (response) {

                commit('setCategoryTreeStatus', true);
            }
        } catch (err) {
            console.error('catagoryTreeSyncProcess failed', err)
        }
    },
    async filterParamSync(context, payload) {
        const { commit } = context;
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}construct-filter-param`)
            if (response) {

                commit('setFilterParamStatus', true);
            }
        } catch (err) {
            console.error('filterParamSyncProcess failed', err)
        }
    },
    async removeAll(context, payload) {
        const { commit } = context;
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}status/removeAll`)
            if (response) {

                commit('clearAllStatus', true);
            }
        } catch (err) {
            console.error('removeAllProcess failed', err)
        }
    },
    async getCountList(context, payload) {
        const { commit } = context;
        const { public: config } = useRuntimeConfig();
        const urlPrefix = config.SYNC_BACKEND_API_URL;
        try {
            const response = await $fetch(`${urlPrefix}data/getAllCount`)
            console.log('getCountList success', response?.list)
            if (response) {
                commit('setProductCountList', response?.list || {});
            }
        } catch (err) {
            console.error('removeAllProcess failed', err)
        }
    }
}