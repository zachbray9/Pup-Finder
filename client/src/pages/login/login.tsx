import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from "@/components/ui/formInput";
import SubmitButton from "@/components/ui/submitButton";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/store";
import LoginRequest from "@/types/requests/loginRequest";
import { useNavigate } from "react-router";
import { LucidePawPrint } from "lucide-react";

export default observer(function Login() {
    const { userStore } = useStore()
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        "name": Yup.string().required("Name is required.").trim(),
        "email": Yup.string().email("Must be a valid email.").required("Email is required.").trim(),
    })

    const handleSubmit = async (values: LoginRequest, formikHelpers: FormikHelpers<LoginRequest>) => {
        const { setStatus, setSubmitting } = formikHelpers

        try {
            await userStore.login(values)
            setStatus(null)
            setSubmitting(false)
            navigate("/search")
        } catch {
            setStatus("There was a problem logging in. Please try again.")
        }
    }

    return (
        <>
            <div className="flex justify-center w-full px-4">
                <Card className="grid md:grid-cols-2 max-w-7xl w-full h-[60dvh] rounded-2xl overflow-hidden p-0">
                    <div className="hidden col-span-1 relative md:flex flex-col items-center w-full h-full">
                        <img src="/LoginImage.jpeg" alt="Login image" className="absolute inset-0 w-full h-full z-0 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-0"></div>

                        <div className="flex flex-col items-center gap-4 z-10 text-white mt-14">
                            <div className="flex gap-2 items-center text-4xl">
                                <LucidePawPrint size={36} />
                                <h1 className="font-bold">Pup Finder</h1>
                            </div>

                            <p className="opacity-90 font-semibold text-pretty text-center max-w-xs">Every pup deserves a second chance. Help one find their forever home.</p>
                        </div>
                    </div>

                    <div className="col-span-1 flex justify-center items-center">
                        <Formik
                            initialValues={{ "name": "", "email": "" }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ isSubmitting, handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-xs justify-center items-center w-full">
                                    <CardHeader className="flex flex-col items-center w-full">
                                        <div className="flex items-center gap-2">
                                            <LucidePawPrint />
                                            <CardTitle className="text-2xl">Welcome back</CardTitle>
                                        </div>
                                        <CardDescription>Sign in to help a pup find a home</CardDescription>
                                    </CardHeader>

                                    <CardContent className="flex flex-col gap-4 w-full">
                                        <FormInput label="Name" name="name" placeholder="Name" />
                                        <FormInput label="Email" name="email" placeholder="Email" />
                                    </CardContent>

                                    <CardFooter className="flex justify-center w-full">
                                        <SubmitButton isSubmitting={isSubmitting} className="hover:cursor-pointer w-full" type="submit" />
                                    </CardFooter>
                                </form>
                            )}
                        </Formik>
                    </div>

                </Card>
            </div >
        </>
    )
})