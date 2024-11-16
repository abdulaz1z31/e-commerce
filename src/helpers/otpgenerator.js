import { generate } from "otp-generator";

export const otpGenerator = async () => {
    return generate(6, { upperCaseAlphabets: false, specialChars: false });
}