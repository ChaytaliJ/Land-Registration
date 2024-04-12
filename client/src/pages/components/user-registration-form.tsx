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
import useContract from "@/hooks/useContract";
import { useState } from "react";
import useFileUpload from "@/hooks/useFileUpload";

const profileFormSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters.").max(30, "Username must not be longer than 30 characters."),
    email: z.string({ required_error: "Please enter an email." }).email(),
    age: z.string(),
    adhaarCardNo: z.string({ required_error: "Adhaar number required" }),
    panCardNo: z.string({ required_error: "Pan card number required" }),
    city: z.string({ required_error: "city name required" })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function UserRegistrationForm() {
    const navigate = useNavigate()
    // const [documentHash, setdocumentHash] = useState()
    const contractInstance: any = useContract();

    const privateKey = localStorage.getItem('key');
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    });

    const { uploadFile, documentHash, uploadProgress } = useFileUpload();

    const handleFileUpload = (event: any) => {
        const file = event.target.files;
        uploadFile(file);
    };

    async function FormHandler(data: any) {

        try {


            const RegisterUser = await contractInstance.methods.registerUser(data.username, data.age, data.city, data.adhaarCardNo, data.panCardNo, documentHash, data.email).send({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' })

            console.log("Transaction receipt:", RegisterUser);
            navigate('/user/dashboard')
        }

        catch (error) {
            console.log(error);
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data: any) => {
                FormHandler(data);
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
                    <Input onChange={handleFileUpload} id="picture" type="file" />
                    <div>{uploadProgress}</div>
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
