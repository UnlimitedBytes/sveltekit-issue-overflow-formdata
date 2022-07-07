// @ts-nocheck
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function post() {
	// Give enough time to check memory
	await delay(10000);
	return {};
}
