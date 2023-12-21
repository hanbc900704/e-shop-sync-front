<template>
    <div class=" rounded-lg p-6 text-center cursor-pointer bg-white dark:bg-gray-700" @click="triggerFileInput"
        @dragover.prevent @dragenter.prevent @drop.prevent="handleDrop">
        <div>
            <div class="flex justify-center">
                <div class=" border-[2px] px-2 py-1 rounded-lg shadow-sm mb-2 border-[#EAECF0]">
                    <UIcon name="i-mdi-cloud-upload-outline bg-[#475467]" class="h-8 w-8" />
                </div>
            </div>
            <p class="text-[#475467]">Click to upload or drag and drop</p>
        </div>
        <input type="file" ref="fileInput" class="hidden" @change="handleChange" multiple>
    </div>

    <div v-if="files.length > 0">
        <div v-for="(file, index) in files" :key="file.name"
            class="flex flex-col px-2 py-3 truncate rounded-lg my-5 border-[2px] border-[#EAECF0] bg-white shadow-sm dark:bg-slate-800">
            <div class="flex flex-row items-center gap-3">
                <UIcon name="i-mdi-file-cloud" class="h-5 w-5" />
                <p>
                    {{ file.name }} <span class="text-[rgb(71,84,103,0.6)] ml-1">|&nbsp; 200KB - {{ file.progress }}%
                        uploaded</span>
                </p>
                <div class="ml-auto">
                    <div v-if="file.progress < 100" class="flex">
                        <UButton class="cancel-button text-gray-600" variant="ghost" icon="i-mdi-window-close"
                            @click="cancelUpload(index)" />
                    </div>
                    <div v-else class="flex">
                        <UButton variant="ghost" icon="i-heroicons-arrow-down-tray" class="text-[#[rgb(71,84,103,0.6)]]"
                            @click="downloadFile(file)" />
                        <UButton variant="ghost" icon="i-mdi-delete-outline" class="text-[#[rgb(71,84,103,0.6)]]"
                            @click="cancelUpload(index)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const fileInput = ref(null)
const files = reactive([])

function triggerFileInput() {
    fileInput.value.click()
}

function handleDrop(e) {
    const droppedFiles = Array.from(e.dataTransfer.files).map(file => reactive({
        file,
        progress: 0 // Initial progress
    }))
    uploadFiles(droppedFiles)
}

function handleChange(e) {
    const selectedFiles = Array.from(e.target.files).map(file => reactive({
        name: file.name,
        file,
        progress: 0 // Initial progress
    }))
    uploadFiles(selectedFiles)
}

function uploadFiles(newFiles) {
    newFiles.forEach((fileWrapper) => {
        // Simulated upload process
        const uploadInterval = setInterval(() => {
            if (fileWrapper.progress >= 100) {
                clearInterval(uploadInterval)
            } else {
                fileWrapper.progress += 20 // Increment progress by 10% every second
            }
        }, 800)

        files.push(fileWrapper)
    })
}

function cancelUpload(index) {
    files.splice(index, 1) // Remove file from list
}

function downloadFile(fileWrapper) {
    const url = window.URL.createObjectURL(fileWrapper.file)
    const a = document.createElement('a')
    a.href = url
    a.download = fileWrapper.file.name
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
}
</script>


<style scoped>
/* Example styles for progress bar and buttons */
.rounded-progress .nuxt-progress {
    border-radius: 10px;
}
</style>
