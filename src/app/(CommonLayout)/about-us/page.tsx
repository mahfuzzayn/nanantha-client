import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import teamImg1 from "@/assets/images/team/mahfuz-transparent.png";
import teamImg2 from "@/assets/images/team/raiyan-transparent.png";
import teamImg3 from "@/assets/images/team/kashem-transparent.png";
import teamImg4 from "@/assets/images/team/arif-transparent.png";
import orangeGradientBg from "@/assets/images/orange-gradient-bg.jpg";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Us ‣ Nanantha",
    description:
        "Learn more about Nanantha—the bookstore dedicated to readers. Our mission is to make books accessible and shopping delightful for book lovers everywhere.",
};

const aboutData = {
    mission:
        "At Nanantha, our mission is to ignite a love for reading by offering a diverse collection of books and an exceptional shopping experience for all book lovers.",
    team: [
        {
            name: "Mahfuz Zayn",
            role: "Founder & CEO",
            image: teamImg1,
            description:
                "A lifelong reader and entrepreneur, Mahfuz founded Nanantha to make discovering and buying books joyful and accessible for everyone.",
        },
        {
            name: "Mushfique Raiyan",
            role: "COO",
            image: teamImg2,
            description:
                "An expert in operations and logistics, Mushfique ensures that every book reaches our customers swiftly and smoothly.",
        },
        {
            name: "KSH Sami",
            role: "DevOps Engineer",
            image: teamImg3,
            description:
                "Sami keeps Nanantha’s online store fast, secure, and always running, making sure customers enjoy a seamless shopping experience.",
        },
        {
            name: "Mujahidul Islam",
            role: "Frontend Developer",
            image: teamImg4,
            description:
                "Mujahidul designs beautiful and user-friendly interfaces that make browsing and buying books on Nanantha a delight.",
        },
    ],

    successStories: [
        {
            title: "A Reader’s Delight",
            story: "Emily discovered her new favorite fantasy series through Nanantha and now can’t wait for each new release!",
        },
        {
            title: "An Author’s Reach",
            story: "Michael self-published his novel on Nanantha and found a dedicated audience of readers who love his work.",
        },
    ],

    vision: "Our vision is to grow Nanantha into a leading global book destination, connecting readers to stories, knowledge, and each other, one book at a time.",
};

const AboutUsPage = () => {
    return (
        <div className="max-w-6xl mx-auto pt-24 mb-40 px-6">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary text-center mb-12">
                About Us
            </h1>
            <Card
                className="mb-8"
                style={{
                    backgroundImage: `url('${orangeGradientBg.src}')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl">Mission Statement</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{aboutData.mission}</p>
                </CardContent>
            </Card>
            <Card
                className="mb-8"
                style={{
                    backgroundImage: `url('${orangeGradientBg.src}')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl text-it-secondary">
                        Meet the Team
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {aboutData.team.map((member, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 bg-it-secondary relative overflow-hidden"
                            >
                                <div className="relative z-[10] space-y-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-primary">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm font-semibold">
                                            {member.role}
                                        </p>
                                    </div>
                                    <p className="text-gray-800 max-w-[350px]">
                                        {member.description}
                                    </p>
                                </div>
                                <div className="relative z-[5]">
                                    <Image
                                        src={member.image}
                                        alt={`Member Image ${index + 1}`}
                                        className="max-w-[200px] absolute -top-[120px] right-0 bg-right object-cover w-full pointer-events-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card
                className="mb-8"
                style={{
                    backgroundImage: `url('${orangeGradientBg.src}')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl text-it-secondary">
                        Success Stories
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {aboutData.successStories.map((story, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold">
                                {story.title}
                            </h3>
                            <p>{story.story}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card
                className=""
                style={{
                    backgroundImage: `url('${orangeGradientBg.src}')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl text-it-secondary">
                        Our Vision
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{aboutData.vision}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AboutUsPage;
