/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PulseLoader from "react-spinners/PulseLoader";

import { auth, db } from "../libs/firebase";
import Layout from "../components/layout/layout";
import { sendPasswordResetEmail } from "firebase/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age must be positive"),

  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  primaryGoal: z.enum([
    "lose_weight",
    "build_muscle",
    "get_fit",
    "maintain_health",
  ]),
  preferredLocation: z.enum(["home", "gym"]),
  availableTime: z.enum(["15min", "30min", "45min", "60min+"]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const [user] = useAuthState(auth);
  const [profileDoc, loading] = useDocument(user && doc(db, "users", user.uid));
  const profile = profileDoc?.data()?.profile;

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<string | null>(null);

  const isGoogleUser = user?.providerData.some(
    (provider) => provider.providerId === "google.com"
  );

  const handleResetPassword = async () => {
    if (!user?.email) return;

    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetStatus(
        "A password reset email has been sent to your email address."
      );
    } catch (error: any) {
      setResetStatus("Failed to send reset email. Please try again.");
      console.error("Password reset error:", error);
    }
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      age: 0,
      fitnessLevel: "beginner",
      primaryGoal: "lose_weight",
      preferredLocation: "home",
      availableTime: "15min",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (profile) {
      const currentValues = form.getValues();
      const formString = JSON.stringify(currentValues);
      const profileString = JSON.stringify({
        name: profile.name || "",
        age: profile.age || 0,
        fitnessLevel: profile.fitnessLevel || "beginner",
        primaryGoal: profile.primaryGoal || "lose_weight",
        preferredLocation: profile.preferredLocation || "home",
        availableTime: profile.availableTime || "15min",
      });
      if (formString !== profileString) {
        reset({
          name: profile.name || "",
          age: profile.age || 0,
          fitnessLevel: profile.fitnessLevel || "beginner",
          primaryGoal: profile.primaryGoal || "lose_weight",
          preferredLocation: profile.preferredLocation || "home",
          availableTime: profile.availableTime || "15min",
        });
      }
    }
  }, [profile, reset, form]);

  const onSubmit = useCallback(
    async (data: ProfileFormValues) => {
      if (!user) return;
      setSaving(true);
      setSuccess(false);
      setError(null);

      try {
        await updateDoc(doc(db, "users", user.uid), {
          profile: {
            ...profile,
            ...data,
          },
        });
        setSuccess(true);
      } catch {
        setError("Failed to update profile. Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [user, profile]
  );

  if (loading)
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <PulseLoader color="#4f46e5" size={12} />
        </div>
      </Layout>
    );

  if (!profile)
    return (
      <Layout>
        <div className="p-4">Profile not found.</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-2 md:p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Profile</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update your personal and fitness details below.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          disabled={saving}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      value={profile.email}
                      disabled
                      className="bg-muted"
                    />
                    {!isGoogleUser && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleResetPassword}
                        className="cursor-pointer"
                      >
                        Reset Password
                      </Button>
                    )}
                    {isGoogleUser && (
                      <p className="text-xs text-yellow-600 italic">
                        Password reset is unavailable for Google accounts.
                      </p>
                    )}
                  </div>
                </FormItem>

                {/* Age */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          disabled={saving}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Fitness Level */}
                <FormField
                  control={form.control}
                  name="fitnessLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fitness Level</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={saving}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fitness level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Primary Goal */}
                <FormField
                  control={form.control}
                  name="primaryGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Goal</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={saving}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lose_weight">
                              Lose Weight
                            </SelectItem>
                            <SelectItem value="build_muscle">
                              Build Muscle
                            </SelectItem>
                            <SelectItem value="get_fit">Get Fit</SelectItem>
                            <SelectItem value="maintain_health">
                              Maintain Health
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Location */}
                <FormField
                  control={form.control}
                  name="preferredLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Location</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={saving}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">Home</SelectItem>
                            <SelectItem value="gym">Gym</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Available Time */}
                <FormField
                  control={form.control}
                  name="availableTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={saving}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select available time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15min">15 min</SelectItem>
                            <SelectItem value="30min">30 min</SelectItem>
                            <SelectItem value="45min">45 min</SelectItem>
                            <SelectItem value="60min+">60 min+</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Joined */}
                <FormItem>
                  <FormLabel>Joined</FormLabel>
                  <Input
                    value={
                      profile.createdAt?.toDate().toLocaleDateString() || ""
                    }
                    disabled
                    className="bg-muted"
                  />
                </FormItem>

                {/* Feedback Messages */}
                <div className="col-span-full space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="bg-green-100 border-green-400 text-green-800">
                      <AlertDescription>
                        Profile updated successfully!
                      </AlertDescription>
                    </Alert>
                  )}

                  {resetStatus && (
                    <Alert className="bg-blue-100 border-blue-400 text-blue-800">
                      <AlertDescription>{resetStatus}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full md:w-auto cursor-pointer"
                  >
                    {saving && (
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
