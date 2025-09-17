
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  role: z.enum(["Admin", "User", "Guest"]),
});

type VerificationStatus = 'unverified' | 'pending' | 'verified';
const MOCK_OTP = "123456";

declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
        confirmationResult?: ConfirmationResult;
    }
}

export function AddUserForm() {
    const { toast } = useToast();
    const [emailStatus, setEmailStatus] = useState<VerificationStatus>('unverified');
    const [phoneStatus, setPhoneStatus] = useState<VerificationStatus>('unverified');
    const [verificationTarget, setVerificationTarget] = useState<'email' | 'phone' | null>(null);
    const [otp, setOtp] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        email: "",
        phone: "",
        role: "User",
        },
    });

    useEffect(() => {
        if (verificationTarget === 'phone' && phoneStatus !== 'verified') {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                    'size': 'invisible',
                    'callback': (response: any) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                    }
                });
            } catch (error) {
                console.error("Error initializing reCAPTCHA", error);
                toast({
                    variant: "destructive",
                    title: "reCAPTCHA Error",
                    description: "Could not initialize reCAPTCHA. Please refresh and try again.",
                });
            }
        }
    }, [verificationTarget, phoneStatus, toast]);

    const isVerified = emailStatus === 'verified' && phoneStatus === 'verified';

    const handleVerifyClick = async (target: 'email' | 'phone') => {
        const value = form.getValues(target);
        if (target === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
            form.setError(target, { type: 'manual', message: 'Please enter a valid email to verify.' });
            return;
        }
        if (target === 'phone' && !/^\+?[1-9]\d{1,14}$/.test(value)) {
            form.setError(target, { type: 'manual', message: 'Please enter a valid phone number (e.g., +14155552671) to verify.' });
            return;
        }
        form.clearErrors(target);

        if (target === 'phone') {
            try {
                const appVerifier = window.recaptchaVerifier!;
                const confirmationResult = await signInWithPhoneNumber(auth, value, appVerifier);
                window.confirmationResult = confirmationResult;
                setVerificationTarget(target);
            } catch (error) {
                console.error("SMS not sent", error);
                toast({
                    variant: "destructive",
                    title: "Failed to send OTP",
                    description: "Could not send verification code. Please check the phone number and try again.",
                });
            }
        } else {
             setVerificationTarget(target);
        }
    };

    const handleOtpSubmit = async () => {
        if (verificationTarget === 'phone') {
            if (window.confirmationResult) {
                try {
                    await window.confirmationResult.confirm(otp);
                    setPhoneStatus('verified');
                    toast({
                        title: "Success",
                        description: "Phone number verified successfully.",
                    });
                    setVerificationTarget(null);
                    setOtp("");
                } catch (error) {
                     toast({
                        variant: "destructive",
                        title: "Invalid OTP",
                        description: "The code you entered is incorrect. Please try again.",
                    });
                }
            }
        } else if (otp === MOCK_OTP) { // Mock email verification
            setEmailStatus('verified');
            toast({
                title: "Success",
                description: `Email verified successfully.`,
            });
            setVerificationTarget(null);
            setOtp("");
        } else {
             toast({
                variant: "destructive",
                title: "Invalid OTP",
                description: "The code you entered is incorrect. Please try again.",
            });
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log("Submitting:", values);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast({
                title: "User created!",
                description: `User ${values.name} has been successfully created.`,
            });
            form.reset();
            setEmailStatus('unverified');
            setPhoneStatus('unverified');
        } catch (error) {
            console.error("Failed to create user", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    }

    return (
        <>
            <div id="recaptcha-container"></div>
            <Card>
            <CardHeader>
                <CardTitle>Add New User</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="flex items-center gap-2">
                            <FormControl>
                                <Input type="email" placeholder="john.doe@example.com" {...field} disabled={emailStatus === 'verified'} />
                            </FormControl>
                            {emailStatus === 'verified' ? (
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="h-5 w-5 mr-1" />
                                    <span className="text-sm font-medium">Verified</span>
                                </div>
                            ) : (
                                <Button type="button" variant="outline" size="sm" onClick={() => handleVerifyClick('email')}>
                                    Verify
                                </Button>
                            )}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <div className="flex items-center gap-2">
                        <FormControl>
                            <Input type="tel" placeholder="+1 123 456 7890" {...field} disabled={phoneStatus === 'verified'} />
                        </FormControl>
                         {phoneStatus === 'verified' ? (
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="h-5 w-5 mr-1" />
                                    <span className="text-sm font-medium">Verified</span>
                                </div>
                            ) : (
                                <Button type="button" variant="outline" size="sm" onClick={() => handleVerifyClick('phone')}>
                                    Verify
                                </Button>
                            )}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Guest">Guest</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={form.formState.isSubmitting || !isVerified}>
                        {form.formState.isSubmitting ? 'Creating User...' : 'Create User'}
                    </Button>
                </CardFooter>
                </form>
            </Form>
            </Card>
            <Dialog open={!!verificationTarget} onOpenChange={() => setVerificationTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify your {verificationTarget}</DialogTitle>
                        <DialogDescription>
                            We've sent a verification code. Please enter it below.
                            {verificationTarget === 'email' && ` (Hint: use ${MOCK_OTP})`}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input 
                            id="otp" 
                            placeholder="Enter 6-digit code" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setVerificationTarget(null)}>Cancel</Button>
                        <Button type="button" onClick={handleOtpSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
