
import { Link } from "react-router-dom"
import { UserAuthForm } from "@/pages/components/user-auth-form"
// import { Button } from "@/components/ui/button"
import chainland from "../assets/chainLand.jpg"
import land from "../assets/aldrin-rachman-pradana-k51kZBpbe0E-unsplash.jpg"
import contract from "../assets/dimitri-karastelev-ZH4FUYiaczY-unsplash.jpg"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function Authentication() {


    return (
        <>
            <div className="md:hidden">
                <img
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <img
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>


            <div className="container relative hidden h-[745px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                <div className="relative hidden h-full flex-col bg-muted p-20 text-white lg:flex dark:border-r">

                    <div className="absolute inset-0 bg-zinc-900" />

                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <div className='pr-7'>
                            <img className='relative z-20 h-20 w-20' src={chainland} alt="" style={{ filter: 'grayscale(100%)' }} />
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        ChainLand Inc
                    </div>

                    <div className="relative z-20 border-t border-gray-300 my-5"></div>

                    <Carousel>
                        <CarouselContent>
                            <CarouselItem><img src={contract} alt="contract" style={{ filter: 'grayscale(100%)' }} /></CarouselItem>
                            <CarouselItem><img src={land} alt="land" style={{ filter: 'grayscale(100%)' }}></img></CarouselItem>
                            <CarouselItem><img src={contract} alt="contract" style={{ filter: 'grayscale(100%)' }} ></img></CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div>

                    <div className="flex flex-col">
                        <div className="lg:p-8 flex justify-center">

                            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                                <div className="flex flex-col space-y-2 text-center">
                                    <h1 className="text-2xl font-semibold tracking-tight">
                                        Login
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Enter your wallets private key
                                    </p>
                                </div>

                                <UserAuthForm />

                                <p className="px-8 text-center text-sm text-muted-foreground">
                                    By clicking continue, you agree to our{" "}
                                    <Link
                                        to="/terms"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        to="/privacy"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
