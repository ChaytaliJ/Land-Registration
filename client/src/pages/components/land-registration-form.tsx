import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";


const profileFormSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters.").max(30, "Username must not be longer than 30 characters."),
    email: z.string({ required_error: "Please enter an email." }).email(),
    age: z.string(),
    adhaarCardNo: z.string({ required_error: "Adhaar number required" }),
    panCardNo: z.string({ required_error: "Pan card number required" }),
    city: z.string({ required_error: "city name required" })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function LandRegistrationForm() {
    const navigate = useNavigate()
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => {
                navigate('/user/dashboard')
                console.log(data)
            })} className="space-y-2">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="adhaarCardNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adhaar card No</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="panCardNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pan card No</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Document</Label>
                    <Input id="picture" type="file" />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="example@gmail.com" style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </Form>
    );
}
