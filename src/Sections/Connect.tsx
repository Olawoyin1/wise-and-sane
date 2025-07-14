import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

const Connect = () => {
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
      captcha: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
      captcha: Yup.string().required("Please verify that you're not a robot"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Submitted values:", values);
      resetForm();
      recaptchaRef.current?.reset();
    },
  });

  return (
    <section className="py-16 px-6 md:px-10 flex justify-center items-center">
      <div className="  ">
        <h2 className="text-3xl font-bold mb-6 text-center">Connect With Us</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4  p-6 md:p-10  bg-white/40 backdrop-blur-sm">
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              placeholder="Jane Doe"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-black"
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.fullname}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-black"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
              placeholder="Let’s discuss your idea"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-black"
            />
            {formik.touched.subject && formik.errors.subject && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.subject}</div>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              placeholder="Write your message here..."
              rows={5}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-black"
            />
            {formik.touched.message && formik.errors.message && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.message}</div>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className="mt-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={(value: string | null) => {
                formik.setFieldValue("captcha", value);
              }}
            />
            {formik.touched.captcha && formik.errors.captcha && (
              <div className="text-sm text-red-500 mt-2">{formik.errors.captcha}</div>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Connect;
