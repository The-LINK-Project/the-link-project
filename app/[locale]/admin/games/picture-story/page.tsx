import PictureStorySetManager from "@/components/admin/games/PictureStorySetManager";
import { getAllPictureStorySets } from "@/lib/actions/pictureStory.actions";

export const dynamic = "force-dynamic";

export default async function PictureStoryAdminPage() {
    const sets = await getAllPictureStorySets();

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[rgb(90,199,219)] mb-4">
                        Picture Story Sets
                    </h1>
                    <p className="text-lg text-slate-600">
                        Create picture-sequence questions for the Picture Story
                        game
                    </p>
                </div>
                <PictureStorySetManager initialSets={sets} />
            </div>
        </div>
    );
}
