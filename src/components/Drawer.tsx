import React from "react";

type DrawerProps = {
    children: any,
    isOpen: boolean,
    setIsOpen: Function
};
export default function Drawer({children, isOpen, setIsOpen}: DrawerProps) {
    return (
        <main
            className={
                "fixed top-0 left-0 h-full z-10 bg-[#44444465] bg-opacity-25 inset-0 transform ease-in-out " +
                (isOpen
                    ? "transition-opacity opacity-100 duration-500 translate-x-0  "
                    : "transition-all delay-500 opacity-0 -translate-x-full  ")
            }
        >
            <section
                className={
                    "left-0 absolute border border-zinc-800 rounded-r shadow bg-zinc-800 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
                    (isOpen ? "translate-x-0 " : " -translate-x-full ")
                }
            >
                <article className="relative border border-zinc-800 rounded-r shadow pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                    {children}
                </article>
            </section>
            <section
                className="h-full cursor-pointer text-left"
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
}
