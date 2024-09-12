"use client";
import { FormEvent, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [course,setCourse]=useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = {
      name,
      email,
      phone,
      course,
      message
    };

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await response.json();

    console.log(content?.data?.table);
    setEmail("");
    setPhone("");
    setMessage("");
    setName("");
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-16">
        <form className="py-4 space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="shadow-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Name"
            />
          </div>

          <div className="flex items-center justify-center">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="shadow-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Email"
            />
          </div>

          <div className="flex items-center justify-center">
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              name="phone"
              id="phone"
              className="shadow-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Phone"
            />
          </div>
          <div className="flex items-center justify-center">
            <label htmlFor="course" id='course' className="sr-only">
              Course Type
            </label>
            <select name="Course" id="Course" onChange={e=>setCourse(e.target.value)} value={course}>
              <option value="chess"> Chess</option>
              <option value="web-development"> Web Development</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
             className="shadow-md focus:ring-indigo-500 focus:border-indigo-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              id="message"
              placeholder="Enter Your queries"
            ></textarea>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 text-white bg-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
