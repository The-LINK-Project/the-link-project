import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const team = [
  {
    name: "Member 1",
    role: "Founder & CEO",
    image: "/assets/member1.png",
    desc: "Visionary leader with a passion for education and technology.",
  },
  {
    name: "Member 2",
    role: "Lead Developer",
    image: "/assets/member2.png",
    desc: "Expert in full-stack development and scalable web solutions.",
  },
  {
    name: "Member 3",
    role: "Curriculum Designer",
    image: "/assets/member3.png",
    desc: "Crafts engaging, effective learning experiences for all ages.",
  },
  {
    name: "Member 4",
    role: "AI Specialist",
    image: "/assets/member4.png",
    desc: "Builds smart, adaptive systems to personalize learning.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-16"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-4xl w-full text-center mb-12">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--primary)" }}
        >
          About Us
        </h1>
        <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
          We are a passionate team dedicated to making English learning
          accessible, personalized, and effective for everyone. Our mission is
          to combine technology and pedagogy to empower learners worldwide.
        </p>
      </div>
      <div className="w-full flex flex-col gap-6 items-center justify-center sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:gap-8 lg:justify-center lg:items-stretch max-w-7xl">
        {team.map((member, idx) => (
          <Card
            key={idx}
            className="flex flex-col items-center justify-between p-4 lg:p-6 w-full max-w-xs lg:max-w-sm min-w-[220px] lg:min-w-[260px] h-[370px] lg:h-[400px] transition-shadow duration-200 bg-card hover:shadow-2xl"
            style={{
              border: "1.5px solid var(--about-card-border, var(--border))",
              background: "var(--about-card-bg, var(--card))",
              boxShadow: "var(--shadow-lg)",
              borderRadius: "1.5rem",
            }}
          >
            <div
              className="w-[90px] h-[120px] mb-3 flex items-center justify-center rounded-lg overflow-hidden"
              style={{
                background: "var(--about-image-bg, var(--muted))",
                border: "1.5px solid var(--about-card-border, var(--border))",
              }}
            >
              {/* Replace with <Image ... /> if using next/image and real images */}
              <span className="text-4xl text-muted-foreground">🖼️</span>
            </div>
            <CardHeader className="items-center p-0 mb-1">
              <CardTitle
                className="text-lg font-semibold"
                style={{ color: "var(--primary)" }}
              >
                {member.name}
              </CardTitle>
              <CardDescription
                className="mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                {member.role}
              </CardDescription>
            </CardHeader>
            <CardContent
              className="text-center p-0 text-sm"
              style={{ color: "var(--foreground)" }}
            >
              {member.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
