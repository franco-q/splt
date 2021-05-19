<template>
	<div class="min-h-screen bg-gray-50 overflow-auto">
		<div class="container mx-auto my-3 px-3">
			<div
				class="bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 mb-3"
				v-if="$store.state.people.length"
			>
				<h2 class="text-xl text-blue-900 font-bold mb-4 lg:mb-6">People</h2>
				<Person
					v-for="person in $store.state.people"
					:key="person.id"
					v-bind="person"
					:debts="splits.filter(debt => debt.val && debt.from.id == person.id)"
					:incomes="splits.filter(debt => debt.val && debt.to.id == person.id)"
				/>
			</div>
			<div class="w-6/12 mx-auto">
				<template v-if="person">
					<div class="relative w-full my-2">
						<svg
							class="w-5 h-5 absolute top-3 left-3 text-blue-900 opacity-70"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
							/>
						</svg>
						<input
							type="text"
							class="bg-white rounded-lg w-full h-10 pr-4 pl-9 placeholder-blue-900 placeholder-opacity-70 text-blue-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-60"
							placeholder="..."
							v-model="person.name"
						/>
					</div>
					<a
						href="#"
						@click.prevent="ADD_PERSON"
						class="text-center bg-white bg-blue-50 hover:bg-blue-100 transition-colors duration-100 text-blue-800 block py-3 px-4 space-x-2 rounded-lg font-bold text-opacity-70 hover:text-opacity-100"
					>
						Guardar
					</a>
				</template>
				<a
					v-else
					href="#"
					@click.prevent="person = { name: '' }"
					class="text-center bg-white bg-blue-50 hover:bg-blue-100 transition-colors duration-100 text-blue-800 block py-3 px-4 space-x-2 rounded-lg font-bold text-opacity-70 hover:text-opacity-100"
				>
					Agregar gente
				</a>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-debugger */
import Person from '@/components/Person'
import { v4 as uuidv4 } from 'uuid'

export default {
	components: { Person },
	data() {
		return {
			person: null,
			splits: []
		}
	},
	created() {
		this.$store.subscribe(mutation => {
			if (mutation.type == 'SET_PARTICIPATIONS') {
				this.calculate()
			}
		})
	},
	methods: {
		calculate() {
			this.splits = []
			let { expenses, people } = this.$store.state
			let loans = people.reduce(
				(obj, p) => Object.assign(obj, { [p.id]: { ...p, debt: 0 } }),
				{}
			)

			expenses.forEach(el => {
				let participants = people.filter(p => p.participations.includes(el.id))
				let participation = parseInt(el.price / (participants.length + 1))

				participants.forEach(p => {
					loans[el.person_id].debt += participation
					loans[p.id].debt -= participation
				})
			})

			const sortedPeople = Object.values(loans).sort((a, b) => a.debt - b.debt)
			const sortedSpending = sortedPeople.map(person => person.debt)

			let i = 0
			let j = sortedPeople.length - 1
			let debt

			while (i < j) {
				debt = Math.min(-sortedSpending[i], sortedSpending[j])
				sortedSpending[i] += debt
				sortedSpending[j] -= debt

				this.splits.push({ from: sortedPeople[i], to: sortedPeople[j], val: debt })

				if (sortedSpending[i] === 0) {
					i++
				}

				if (sortedSpending[j] === 0) {
					j--
				}
			}
		},
		ADD_PERSON() {
			let person = this.person
			person.id = uuidv4()
			person.participations = []
			this.$store.commit('ADD_PERSON', person)
			this.person = null
		}
	}
}
</script>
