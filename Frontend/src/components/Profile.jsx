import React, { useState } from "react";
import { Modal, Input, Form, Select, Upload, Button } from "antd";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import useAuthStore from "../store/user.store";
import { logout, updateProfile } from "../apiManager/auth"
import { useNavigate } from "react-router-dom"


const ProfilePage = () => {
    const navigate = useNavigate()
    const { user, setUser } = useAuthStore()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [isUpload, setIsUpload] = useState(false)

    const generateAvatarUrl = (name) => {
        const initials = name
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
        return `https://ui-avatars.com/api/?name=${initials}`;
    }

    const handleLogout = async () => {
        const response = await logout()
        console.log(response);
        setUser(null)
        localStorage.removeItem("auth-storage")
        navigate('/')
    }

    const handleEditClick = () => {
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            skills: user.profile.skills,
            experience: user.profile.experience,
            role: user.role,
            resume: user.profile.resume
        });
        setIsModalOpen(true);
    };

    const handleFileChange = ({ file }) => {
        console.log("File selected:", file)
        setFile(file);
    };

    const sabmitHandler = async () => {
        try {
            setIsUpload(true)
            const values = await form.validateFields()

            const updatedData = {
                ...user,
                name: values?.name,
                email: values?.email,
                role: values?.role,
                resume: file,
                profile: {
                    skills: typeof values.skills === 'string' ? values.skills.split(",").map((skill) => skill.trim()) : user.profile.skills,
                    experience: values?.experience || user.profile.experience,
                },
            };

            console.log("updated data", updatedData);


            const response = await updateProfile(updatedData)
            console.log(response);
            setUser(response.updatedUser)

        } catch (error) {
            console.error("Validation failed:", error)
        } finally {
            setIsModalOpen(false)
            setIsUpload(false)
        }
    }


    return (
        <div className="h-[90vh] bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="bg-gray-800 shadow-lg rounded-lg p-12 w-full max-w-3xl">
                {/* Profile Image */}
                <div className="flex justify-center">
                    <img
                        src={generateAvatarUrl(user.name || "User")}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-yellow-400"
                    />
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold text-center mt-4">{user.name}</h2>
                <p className="text-gray-400 text-center">{user.email}</p>
                <div className="flex items-center justify-center text-sm text-center my-6">
                    {
                        user.profile.skills.map((skill, i) => (
                            <p key={i} className="px-4 py-3 border border-yellow-400 text-yellow-400 mx-2 rounded">{skill.trim() || "Your Skills"}</p>
                        ))
                    }
                </div>
                <p className="text-xl font-semibold text-center mt-2 text-yellow-400">{user.profile.experience}</p>

                {/* Resume Link */}
                {user.profile.resume && (
                    <div className="flex justify-center mt-4">
                        <a
                            href={user.profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            View Resume
                        </a>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                    <button className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition cursor-pointer"
                        onClick={handleEditClick}
                    >
                        <FaUserEdit /> Edit Profile
                    </button>
                    <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Modal
                title="Edit Profile"
                open={isModalOpen}
                onOk={sabmitHandler}
                onCancel={() => setIsModalOpen(false)}
                okText={isUpload ? 'Uploading...' : 'Save'}
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
                        <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item name="skills" label="Skills">
                        <Input placeholder="Enter skills (comma separated)" />
                    </Form.Item>
                    <Form.Item name="experience" label="Experience">
                        <Input placeholder="Enter your experience" />
                    </Form.Item>
                    <Form.Item name="role" label="Role">
                        <Select placeholder="Select role">
                            <Select.Option value="candidate">Candidate</Select.Option>
                            <Select.Option value="interviewer">Interviewer</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'resume'} label="Resume : (Upload only in Image format)">
                        <Upload
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            <Button icon={<UploadOutlined />}>Upload Resume</Button>
                        </Upload>

                        {user.profile.resume && (
                            <p className="text-green-500 mt-2">
                                Resume Uploaded -{" "}
                                <a
                                    href={user.profile.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline"
                                >
                                    View Resume
                                </a>
                            </p>
                        )}
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default ProfilePage;
