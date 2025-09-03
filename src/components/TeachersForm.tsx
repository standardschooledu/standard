"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import Signoutbtn from "./signoutbtn";

export default function TeacherForm() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    profile_img: "",
    phone_number: "",
    email: "",
    alternative_email: "",
    home_address: "",
    nin: "",
    institutions_attended: [
      { institution_name: "", year_graduated: "", qualification: "" },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInstitutionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newInstitutions = [...form.institutions_attended];
    newInstitutions[index][field as keyof typeof newInstitutions[0]] = value;
    setForm({ ...form, institutions_attended: newInstitutions });
  };

  const addInstitution = () => {
    setForm({
      ...form,
      institutions_attended: [
        ...form.institutions_attended,
        { institution_name: "", year_graduated: "", qualification: "" },
      ],
    });
  };

  const removeInstitution = (index: number) => {
    const newInstitutions = form.institutions_attended.filter((_, i) => i !== index);
    setForm({ ...form, institutions_attended: newInstitutions });
  };

  const handleSubmit = async () => {
    if (!session?.user) return;
    setLoading(true);

    const { error } = await supabase.from("teachers").insert({
      user_id: session.user.id,
      ...form,
      institutions_attended: form.institutions_attended,
    });

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Teacher info submitted!");
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#fafafa] rounded-2xl border mt-6">
      <h2 className="text-xl font-semibold mb-4">
        {step === 1 && "Personal Information"}
        {step === 2 && "Contact Information"}
        {step === 3 && "Educational Background"}
      </h2>

      {/* Step 1 - Personal Info */}
      {step === 1 && (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex-1">
                <Label htmlFor="first_name">First Name</Label>
                <Input className="py-5 rounded mt-2 mb-4 shadow-none" id="first_name" name="first_name" value={form.first_name} onChange={handleChange} />
            </div>
            <div className="flex-1">
                <Label htmlFor="last_name">Last Name</Label>
                <Input className="py-5 rounded mt-2 mb-4 shadow-none" id="last_name" name="last_name" value={form.last_name} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              className={`py-2 ${form.gender ? '' : 'text-gray-400'} rounded mt-2 mb-4 shadow-none w-full border`}
              value={form.gender}
              onChange={handleChange}
            >
              <option className="text-gray-400" value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <Label>Marital Status</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" name="marital_status" value={form.marital_status} onChange={handleChange} />
          </div>
        </div>
      )}

      {/* Step 2 - Contact Info */}
      {step === 2 && (
        <div className="space-y-3">
          <div>
            <Label>Phone Number</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" name="phone_number" value={form.phone_number} onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Alternative Email</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" name="alternative_email" type="email" value={form.alternative_email} onChange={handleChange} />
          </div>
          <div>
            <Label>Address</Label>
            <Textarea name="home_address" value={form.home_address} onChange={handleChange} />
          </div>
        <div>
            <Label>NIN (National Identification Number)</Label>
            <Input
                className="py-5 rounded mt-2 mb-4 shadow-none"
                name="nin"
                value={form.nin || ""}
                onChange={handleChange}
            />
        </div>
          {/* <div>
            <Label>City</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" name="city" value={form.city} onChange={handleChange} />
          </div>
          <div>
            <Label>State</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" name="state" value={form.state} onChange={handleChange} />
          </div>
          <div>
            <Label>Country</Label>
            <Input className="py-5 rounded mt-2 mb-4 shadow-none" name="country" value={form.country} onChange={handleChange} />
          </div> */}
        </div>
      )}

      {/* Step 3 - Educational Background */}
      {step === 3 && (
        <div className="space-y-4">
          {form.institutions_attended.map((inst, index) => (
            <div key={index} className="border p-3 rounded-lg space-y-2 relative">
              <div>
                <Label>Institution Name</Label>
                <Input className="py-5 rounded mt-2 mb-4 shadow-none"
                  value={inst.institution_name}
                  onChange={(e) =>
                    handleInstitutionChange(index, "institution_name", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Year Graduated</Label>
                <Input className="py-5 rounded mt-2 mb-4 shadow-none"
                  type="number"
                  value={inst.year_graduated}
                  onChange={(e) =>
                    handleInstitutionChange(index, "year_graduated", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Qualification</Label>
                <Input className="py-5 rounded mt-2 mb-4 shadow-none"
                  value={inst.qualification}
                  onChange={(e) =>
                    handleInstitutionChange(index, "qualification", e.target.value)
                  }
                />
              </div>
              {index > 0 && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeInstitution(index)}
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={addInstitution}
          >
            <PlusCircle size={16} /> Add Another Institution
          </Button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between my-6">
        {step > 1 && (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        )}
      </div>
      <Signoutbtn />
    </div>
  );
}