"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import generateRandomName from "@/helpers/generateRandomName";

import React, { useEffect, useState } from 'react'

function WelcomeDialog() {
    const [name, setName] = useState("");

    useEffect(() => {
        // Check if the user already has an id
        const name = localStorage.getItem("name");

        if (!name) {
            const generatedName = generateRandomName();
            setName(generatedName);

            localStorage.setItem("name", generatedName);

            document.getElementById("open")?.click();
        }
    }, []);

    return (
        <Dialog>
            <DialogTrigger className="hidden" id="open">Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Welcome to OpenConfess</DialogTitle>
                    <DialogDescription>
                        Hey there, I'm Kin, the creator of OpenConfess, just a small heads up: We generated a unique name for you: <span className="font-semibold">{name}</span> <br /> <br />
                        You'll be uising this name to interact on the platfrom but other than that, you're still absolutely anonymous, have fun !
                    </DialogDescription>
                </DialogHeader>
                <DialogClose>Close</DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default WelcomeDialog
