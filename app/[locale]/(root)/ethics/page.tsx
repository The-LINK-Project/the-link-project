import { AiEthicsGame } from "@/components/ethics/AiEthicsGame";
import { requireSignedIn } from "@/lib/auth";

export default async function EthicsPage() {
    // Whose game to pick back up, known here, so the game need not wait for
    // the sign-in script to load in the browser before it can show anything.
    const owner = await requireSignedIn();
    return <AiEthicsGame owner={owner} />;
}
