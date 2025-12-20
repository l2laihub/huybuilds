"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "./ui/SectionReveal";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  context: string;
  type: "client" | "colleague";
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Huy's ability to take your vision of an app into reality means he is basically a magician. He is expedient and thoughtful in his process and exceeded some of my expectations. He built out an entire backend to make it autonomous for me to make my own updates which I appreciated very much. Highly recommended.",
    author: "Ben B.",
    context: "ABL Meditation",
    type: "client",
  },
  {
    quote:
      "Huy jumped in at an early design and development stage of a novel LLM application with a lot of customizations. He ramped up fast on Python coding and usage of LLM models. He contributed significantly in designing and implementing solutions to complex problems on the backend as well as middle tier. I really appreciate his methodical design and testing approach as well as his systematic documentation. He will be a valuable asset to any team he joins.",
    author: "Jyoti Gawade",
    role: "Sr. Software Design Engineer",
    context: "Microsoft",
    type: "colleague",
  },
  {
    quote:
      "Huy is a hardworking, diligent and brilliant software engineer. He goes to extreme lengths to solve any problem he is given. He has a \"never quit\" attitude that shines through his work. He is patient, gentle, and a pleasure to work with. Any organization is lucky to have him as part of their team.",
    author: "Saurav Bhattacharya",
    role: "Commercial Operations @ Microsoft",
    context: "Microsoft",
    type: "colleague",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 relative">
      <div className="container">
        <SectionReveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs md:text-sm text-amber-500 tracking-wider uppercase">
              // Testimonials
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Client Feedback
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            What clients say about working together.
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="relative h-full overflow-hidden bg-[#161619] border border-[#27272a] rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-2.5 py-1 text-xs font-mono rounded ${
                      testimonial.type === "client"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {testimonial.type === "client" ? "CLIENT" : "LINKEDIN"}
                  </span>
                  <svg
                    className="w-6 h-6 text-amber-500/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <blockquote className="relative">
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  <footer className="flex items-center gap-3 pt-4 border-t border-[#27272a]">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-500 font-mono text-sm font-semibold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-mono font-semibold text-sm">
                        {testimonial.author}
                      </p>
                      <p className="text-zinc-500 text-xs truncate">
                        {testimonial.role ? `${testimonial.role} · ` : ""}
                        {testimonial.context}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
