"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { lessons } from '@/constants';
import { createLesson } from '@/lib/actions/Lesson.actions';

const CreatePage = () => {
    const handleResponse = async () => {
    for (const lesson of lessons) {
        const title = lesson.title;
        const description = lesson.description;
        const objectives = lesson.objectives;

        const newLesson = await createLesson({ title, description, objectives });
        console.log(`Created new lesson: ${newLesson}`)
    }
    }
    return (
        <div>
            <Button onClick={handleResponse}>Create Lessons from the constants</Button>
        </div>
    )
}

export default CreatePage