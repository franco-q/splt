<template>
	<div class="w-full mb-8">
		<div class="flex justify-between_ w-full">
			<div class="flex flex-col items-start w-40">
				<span class="font-bold text-blue-900 ">{{ name }}</span>
				<a
					href="#"
					class="text-sm text-blue-800 opacity-50 whitespace-nowrap"
					@click.prevent="() => $refs.modal.open()"
					>Agregar gasto</a
				>
			</div>
			<div class="flex flex-col items-start pl-2">
				<span
					class="text-gray-500 text-base mb-2 bg-gray-100 border-full  px-3 rounded-full"
					v-for="spnd in $store.state.expenses.filter(e => e.person_id == id)"
					:key="spnd.id"
					>Gasto <strong>${{ spnd.price }}</strong> en
					<strong>{{ spnd.title }}</strong></span
				>
				<div v-for="debt in incomes" :key="debt.from.id" class="flex">
					<span
						class="text-green-500 text-base mb-2 bg-green-100 border-full  px-3 rounded-full"
					>
						Recibe <strong>${{ debt.val }}</strong>
						de
						<strong>
							{{ debt.from.name }}
						</strong>
					</span>
				</div>
				<div v-for="debt in debts" :key="debt.to.id" class="flex">
					<span
						class="text-red-500 text-base mb-2 bg-red-100 border-full  px-3 rounded-full"
					>
						Paga <strong>${{ debt.val }}</strong>
						a
						<strong>
							{{ debt.to.name }}
						</strong>
					</span>
				</div>
			</div>
		</div>
		<div class="flex flex-wrap" v-if="$store.state.expenses.length">
			<span class="font-bold text-gray-500 pr-4">Participa de: </span>
			<div
				v-for="participation in $store.state.expenses.filter(e => e.person_id != id)"
				:key="participation.id"
				class="mr-2 whitespace-nowrap"
			>
				<input
					type="checkbox"
					:name="participation.id"
					:id="participation.id"
					v-model="participate"
					:value="participation.id"
				/>
				<span class="ml-1">{{ participation.title }}</span>
				<small
					>(${{ participation.price }}/{{
						$store.state.people.filter(p => p.participations.includes(participation.id))
							.length + 1
					}}=${{
						parseInt(
							participation.price /
								($store.state.people.filter(p =>
									p.participations.includes(participation.id)
								).length +
									1)
						)
					}})</small
				>
			</div>
		</div>

		<Modal ref="modal">
			<div class="p-2">
				<div class="flex items-center my-2 pr-2">
					<div class="md:w-1/3">
						<label
							class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
							for="spending-price"
						>
							Precio
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
							id="spending-price"
							v-model="spending.price"
							type="text"
						/>
					</div>
				</div>
				<div class="flex items-center my-2 pr-2">
					<div class="md:w-1/3">
						<label
							class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
							for="spending-title"
						>
							Titulo
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
							id="spending-title"
							v-model="spending.title"
							type="text"
						/>
					</div>
				</div>
				<div class="">
					<div class="">
						<label
							class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
							for="spending-notes"
						>
							Notas
						</label>
					</div>
					<div class="">
						<textarea
							class="appearance-none border-2 border-gray-500 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
							id="spending-notes"
							v-model="spending.notes"
							rows="4"
						></textarea>
					</div>
				</div>
				<button
					@click.prevent="spend"
					class="text-center bg-white bg-blue-50 hover:bg-blue-100 transition-colors duration-100 text-blue-800 block py-3 px-4 rounded-lg font-bold text-opacity-70 hover:text-opacity-100 block w-full"
				>
					Guardar
				</button>
			</div>
		</Modal>
	</div>
</template>

<script>
import Modal from '@/components/Modal'
import { v4 as uuidv4 } from 'uuid'
export default {
	components: { Modal },
	props: {
		name: { default: null },
		id: { default: null },
		expenses: {
			type: Array,
			default: function() {
				return []
			}
		},
		debts: {
			type: Array,
			default: function() {
				return []
			}
		},
		participations: {
			type: Array,
			default: function() {
				return []
			}
		},
		incomes: {
			type: Array,
			default: function() {
				return []
			}
		}
	},
	data() {
		return {
			participate: this.participations,
			spending: {
				value: 0,
				title: '',
				notes: ''
			}
		}
	},
	watch: {
		participate(participations) {
			this.$store.commit('SET_PARTICIPATIONS', { id: this.id, participations })
		}
	},
	methods: {
		spend() {
			let spending = this.spending
			spending.id = uuidv4()
			spending.person_id = this.id
			this.$store.commit('ADD_EXPENSE', spending)
			this.spending = {
				value: 0,
				title: '',
				notes: ''
			}
			this.$refs.modal.close()
		}
	}
}
</script>

<style></style>
