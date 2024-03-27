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
    area: z.string({ required_error: "Please enter area." }),
    survey: z.string({ required_error: "Please enter survey No" }),
    state: z.string(),
    price: z.string({ required_error: "Adhaar number required" }),
    pid: z.string({ required_error: "Pan card number required" }),
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
                    name="area"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area(SqFt)</FormLabel>
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
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Land Price</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PID</FormLabel>
                            <FormControl>
                                <Input {...field} style={{ width: "600px" }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="survey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Survey No</FormLabel>
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
                <div className="pt-6">
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </Form>
    );
}
