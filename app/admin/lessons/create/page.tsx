"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { createLesson } from "@/lib/actions/Lesson.actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LessonFormData {
  title: string;
  description: string;
  objectives: string[];
  lessonIndex: number;
  difficulty: string;
}

const difficulties = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];

const CreateLessonPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LessonFormData>({
    title: "",
    description: "",
    objectives: ["", "", ""],
    lessonIndex: 0,
    difficulty: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = value;
    setFormData({ ...formData, objectives: newObjectives });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.difficulty === "") {
        setMessage("Please select a difficulty level");
        return;
      }

      console.log("Submitting lesson data:", formData);

      const result = await createLesson({
        title: formData.title,
        description: formData.description,
        objectives: formData.objectives.filter((obj) => obj.trim() !== ""),
        lessonIndex: formData.lessonIndex as unknown as Number,
        difficulty: formData.difficulty,
      });

      console.log("Lesson created successfully:", result);
      setMessage("Lesson created successfully!");

      setTimeout(() => {
        router.push("/admin/lessons/manage");
      }, 2000);
    } catch (error) {
      console.error("Error creating lesson:", error);
      setMessage(
        `Failed to create lesson: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/lessons">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lessons
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Create New Lesson
                </h1>
                <p className="text-slate-600 mt-2">
                  Add a new educational lesson to your content library
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Content Creator
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {message && (
          <div
            className={`mb-6 p-4 rounded-md border ${
              message.includes("Error") || message.includes("Failed")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Lesson Details
                </CardTitle>
                <CardDescription>
                  Fill in the information for your new lesson
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Lesson Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter a descriptive lesson title"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe what students will learn in this lesson"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lesson Index */}
                    <div className="space-y-2">
                      <Label htmlFor="lessonIndex">Lesson Number</Label>
                      <Input
                        id="lessonIndex"
                        type="number"
                        value={formData.lessonIndex}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lessonIndex: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="1"
                        min="0"
                        required
                      />
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {formData.difficulty
                              ? difficulties.find(
                                  (difficulty) =>
                                    difficulty.value === formData.difficulty
                                )?.label
                              : "Select difficulty..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search difficulty..." />
                            <CommandList>
                              <CommandEmpty>No difficulty found.</CommandEmpty>
                              <CommandGroup>
                                {difficulties.map((difficulty) => (
                                  <CommandItem
                                    key={difficulty.value}
                                    value={difficulty.value}
                                    onSelect={(currentValue) => {
                                      setFormData({
                                        ...formData,
                                        difficulty:
                                          currentValue === formData.difficulty
                                            ? ""
                                            : currentValue,
                                      });
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        formData.difficulty === difficulty.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {difficulty.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Objectives */}
                  <div className="space-y-2">
                    <Label>Learning Objectives</Label>
                    <div className="space-y-3">
                      {formData.objectives.map((objective, index) => (
                        <div key={index}>
                          <Input
                            type="text"
                            value={objective}
                            onChange={(e) =>
                              handleObjectiveChange(index, e.target.value)
                            }
                            placeholder={`Learning objective ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500">
                      Add up to 3 specific learning objectives for this lesson
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Creating Lesson..." : "Create Lesson"}
                    </Button>
                    <Link href="/admin/lessons">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-slate-200 sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
                <CardDescription>How your lesson will appear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-500">
                    TITLE
                  </Label>
                  <p className="font-semibold text-slate-900">
                    {formData.title || "Untitled Lesson"}
                  </p>
                </div>

                <div>
                  <Label className="text-xs font-medium text-slate-500">
                    DESCRIPTION
                  </Label>
                  <p className="text-sm text-slate-600">
                    {formData.description || "No description provided"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <div>
                    <Label className="text-xs font-medium text-slate-500">
                      NUMBER
                    </Label>
                    <Badge variant="outline">#{formData.lessonIndex}</Badge>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-slate-500">
                      DIFFICULTY
                    </Label>
                    {formData.difficulty && (
                      <Badge
                        variant={
                          formData.difficulty === "beginner"
                            ? "default"
                            : formData.difficulty === "intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {formData.difficulty}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-slate-500">
                    OBJECTIVES
                  </Label>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {formData.objectives
                      .filter((obj) => obj.trim())
                      .map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{objective}</span>
                        </li>
                      ))}
                    {formData.objectives.filter((obj) => obj.trim()).length ===
                      0 && (
                      <p className="text-slate-400 italic">
                        No objectives added
                      </p>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLessonPage;
