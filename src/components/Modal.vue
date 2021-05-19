<template>
	<transition name="pop" appear>
		<div
			class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
			style="background: rgba(0,0,0,.7);"
			ref="modal"
			v-if="showModal"
		>
			<div
				class="bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto"
			>
				<div class="p-5 relative">
					<div class="absolute top-3 right-3 cursor-pointer z-50" @click="close">
						<svg
							class="fill-current text-black"
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
						>
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
							/>
						</svg>
					</div>
					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			showModal: false
		}
	},
	methods: {
		open() {
			this.showModal = true
		},
		close() {
			this.showModal = false
		}
	}
}
</script>

<style>
/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
	transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
	opacity: 0;
	/* transform: scale(0.3) translateY(-50%); */
}
</style>
