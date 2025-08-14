import { getTranscript } from "$lib/server/transcript"

export const load = async () => {
    console.log(await getTranscript("XGOiObvSAs0"))
}