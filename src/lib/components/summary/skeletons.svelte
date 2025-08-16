<div class="container mx-auto max-w-3xl animate-pulse px-4 py-12">
	<div class="space-y-8">
		<!-- Enhanced Thumbnail & Header Skeleton -->
		<div
			class="relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 sm:h-[300px]"
		>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
			></div>
			<div class="absolute bottom-6 left-6 space-y-4 sm:bottom-8 sm:left-8">
				<!-- Avatar Skeleton -->
				<div class="flex items-center gap-3">
					<div class="h-8 w-8 rounded-full bg-zinc-700/80 backdrop-blur-sm"></div>
					<div class="h-5 w-24 rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
				</div>
				<!-- Title Skeleton -->
				<div class="space-y-3">
					<div class="h-7 w-80 max-w-full rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
					<div class="h-7 w-64 max-w-full rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
				</div>
				<!-- Buttons Skeleton -->
				<div class="flex items-center gap-3 pt-2">
					<div class="h-10 w-40 rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
					<div class="h-10 w-10 rounded-full bg-zinc-700/80 backdrop-blur-sm"></div>
					<div class="h-10 w-10 rounded-full bg-zinc-700/80 backdrop-blur-sm"></div>
				</div>
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

		<!-- Key Takeaway Skeleton -->
		<div class="space-y-6">
			<div class="flex items-center gap-2">
				<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
				<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
			</div>
			<div class="rounded-lg bg-zinc-900/50 p-6">
				<div class="h-6 w-full rounded-lg bg-zinc-700"></div>
				<div class="mt-2 h-6 w-3/4 rounded-lg bg-zinc-700"></div>
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

		<!-- Key Points Skeleton -->
		<div class="space-y-6">
			<div class="flex items-center gap-2">
				<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
				<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
			</div>
			<div class="space-y-4">
				{#each { length: 3 } as _}
					<div class="flex items-start gap-3 rounded-lg bg-zinc-900/50 p-4">
						<div class="h-5 w-5 flex-shrink-0 rounded-full bg-zinc-700"></div>
						<div class="flex-1 space-y-2">
							<div class="h-4 w-full rounded-lg bg-zinc-700"></div>
							<div class="h-4 w-3/4 rounded-lg bg-zinc-700"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

		<!-- Core Terms Skeleton -->
		<div class="space-y-6">
			<div class="flex items-center gap-2">
				<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
				<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
			</div>
			<div class="flex flex-wrap gap-3">
				{#each { length: 5 } as _}
					<div class="h-8 w-20 rounded-full bg-zinc-700"></div>
				{/each}
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

		<!-- Summary Skeleton -->
		<div class="space-y-6">
			<div class="flex items-center gap-2">
				<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
				<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
			</div>
			<div class="space-y-4 rounded-lg bg-zinc-900/50 p-6">
				<div class="h-4 w-full rounded-lg bg-zinc-700"></div>
				<div class="h-4 w-full rounded-lg bg-zinc-700"></div>
				<div class="h-4 w-11/12 rounded-lg bg-zinc-700"></div>
				<div class="h-4 w-4/5 rounded-lg bg-zinc-700"></div>
			</div>
		</div>
	</div>
</div>
