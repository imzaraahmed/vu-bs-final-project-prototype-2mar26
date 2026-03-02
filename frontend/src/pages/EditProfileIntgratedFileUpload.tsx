import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"

import axios from "axios"
import { useEffect, useState } from "react"

type Profile = {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  position: string
  available_start_date: string
  employment_status: string
  resume?: string // URL to resume file
}

export default function EditProfileIntegratedFileUPloadPage() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState<Profile>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
    available_start_date: "",
    employment_status: "",
    resume: ""
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get<Profile[]>(
          "http://localhost:5000/api/profileupload"
        )

        if (res.data.length > 0) {
          const data = res.data[0]

          setProfile({
            ...data,
            available_start_date: data.available_start_date
              ? data.available_start_date.split("T")[0]
              : ""
          })
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      }
    }

    fetchProfile()
  }, [])

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle select change
  const handleSelectChange = (value: string) => {
    setProfile((prev) => ({
      ...prev,
      employment_status: value
    }))
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0])
    }
  }

  // Submit form
  const handleSubmit = async () => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("first_name", profile.first_name)
      formData.append("last_name", profile.last_name)
      formData.append("email", profile.email)
      formData.append("phone", profile.phone)
      formData.append("position", profile.position)
      formData.append("available_start_date", profile.available_start_date)
      formData.append("employment_status", profile.employment_status)

      if (resumeFile) {
        formData.append("resume", resumeFile)
      }

      if (profile.id) {
        await axios.put(
          `http://localhost:5000/api/profileupload/${profile.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
      } else {
        await axios.post("http://localhost:5000/api/profileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      }

      navigate("/profile")
    } catch (err) {
      console.error("Failed to save profile:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit My Profile - Integrated</h1>
          <p className="text-muted-foreground text-sm">
            Edit your profile information and details
          </p>
        </div>

        <div className="flex gap-4">
          <Link to="/profile">
            <Button variant="outline">Cancel</Button>
          </Link>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>My Personal Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Position Looking</Label>
              <Input
                name="position"
                value={profile.position}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Available Start Date</Label>
              <Input
                type="date"
                name="available_start_date"
                value={profile.available_start_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="mb-2">Employment Status</Label>
              <Select
                value={profile.employment_status}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Employed">Employed</SelectItem>
                    <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                    <SelectItem value="Unemployed">Unemployed</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label>Upload Resume (PDF/DOC)</Label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />

              {/* Show current resume if exists */}
              {profile.resume && (
                <a
                  href={`http://localhost:5000/${profile.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Current Resume
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}