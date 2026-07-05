import React from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutGrid, BookImage } from "lucide-react";
import { getAllWordMatchRounds } from "@/lib/actions/wordMatch.actions";
import { getAllPictureStorySets } from "@/lib/actions/pictureStory.actions";

export const dynamic = "force-dynamic";

const GamesAdminPage = async () => {
    const [rounds, sets] = await Promise.all([
        getAllWordMatchRounds().catch(() => []),
        getAllPictureStorySets().catch(() => []),
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Games Management
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Manage content for the self-paced mini-games
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-[rgb(90,199,219)]/30 bg-white">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-[rgb(90,199,219)] to-[rgb(70,179,199)] rounded-lg flex items-center justify-center shadow-md">
                                    <LayoutGrid className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-semibold text-slate-900">
                                        Word Match
                                    </CardTitle>
                                    <CardDescription className="text-slate-600">
                                        Tap-to-match pairs of words, pictures
                                        and replies
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-sm text-slate-500">
                                    {rounds.length} rounds
                                </span>
                                <Link href="/admin/games/word-match">
                                    <Button
                                        size="sm"
                                        className="bg-[rgb(90,199,219)] hover:bg-[rgb(70,179,199)] text-white"
                                    >
                                        Manage
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-purple-300 bg-white">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                                    <BookImage className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-semibold text-slate-900">
                                        Picture Story
                                    </CardTitle>
                                    <CardDescription className="text-slate-600">
                                        Picture sequences with multiple-choice
                                        sentences
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-sm text-slate-500">
                                    {sets.length} question sets
                                </span>
                                <Link href="/admin/games/picture-story">
                                    <Button
                                        size="sm"
                                        className="bg-purple-500 hover:bg-purple-600 text-white"
                                    >
                                        Manage
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GamesAdminPage;
