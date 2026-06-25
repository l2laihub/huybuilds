import type { StudioLang } from "./strings";

/** A single titled block of paragraphs within a legal document. */
export type LegalSection = { heading: string; body: string[] };

/** A full legal document, rendered top-to-bottom by LegalPage. */
export type LegalDoc = {
  title: string;
  /** e.g. "Last updated: June 24, 2026" — already localized. */
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

/**
 * Plain-language legal pages for HuyBuilds Studio (operated by LTH Apps LLC).
 * These are informational and not a substitute for legal advice; keep the
 * facts here in sync with config.ts (contact details) and the pricing copy.
 */

export const PRIVACY: Record<StudioLang, LegalDoc> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: June 24, 2026",
    intro: [
      "HuyBuilds Studio is operated by LTH Apps LLC (“we,” “us,” or “our”), based in Seattle, Washington, USA. This policy explains what information we collect when you visit our website or contact us, how we use it, and the choices you have.",
    ],
    sections: [
      {
        heading: "Information you give us",
        body: [
          "When you fill out our contact form, we collect the details you choose to share: your name, phone number, email address, business name, business type, and your message. We use this only to respond to you and to provide the services you ask about.",
        ],
      },
      {
        heading: "Information we collect automatically",
        body: [
          "Like most websites, we collect basic usage data when you visit — such as the pages you view, the type of device and browser you use, and an approximate location based on your IP address. We use a privacy-friendly analytics tool (PostHog) to understand how the site is used and to improve it. This may involve cookies or similar technologies.",
        ],
      },
      {
        heading: "How we use your information",
        body: [
          "We use the information we collect to reply to your inquiries, deliver and improve our services, keep the website working and secure, and understand which content is helpful. We do not sell your personal information.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "We share information only with the service providers that help us operate — for example, our website host (Netlify), our analytics provider (PostHog), and the email and messaging tools we use to reply to you. These providers may only use the information to perform services for us. We may also disclose information if required by law.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "We keep contact-form messages for as long as needed to respond and to maintain our business records, and analytics data for a limited period. You can ask us to delete your information at any time.",
        ],
      },
      {
        heading: "Your choices and rights",
        body: [
          "You may ask us to access, correct, or delete the personal information we hold about you. You can also ask us to stop contacting you. To make a request, email us at studio@huybuilds.app and we will respond within a reasonable time.",
        ],
      },
      {
        heading: "Children’s privacy",
        body: [
          "Our website and services are intended for business owners and are not directed to children under 13. We do not knowingly collect personal information from children.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We may update this policy from time to time. When we do, we will revise the “Last updated” date above. Significant changes will be reflected on this page.",
        ],
      },
      {
        heading: "Contact us",
        body: [
          "If you have any questions about this policy or your information, contact LTH Apps LLC (HuyBuilds Studio) at studio@huybuilds.app or (425) 998-7191.",
        ],
      },
    ],
  },
  vi: {
    title: "Chính Sách Bảo Mật",
    updated: "Cập nhật lần cuối: ngày 24 tháng 6, 2026",
    intro: [
      "HuyBuilds Studio do công ty LTH Apps LLC (“chúng tôi”) điều hành, đặt tại Seattle, Washington, Hoa Kỳ. Chính sách này giải thích chúng tôi thu thập thông tin gì khi anh chị/cô chú ghé trang web hoặc liên hệ với chúng tôi, dùng thông tin đó ra sao, và anh chị/cô chú có những lựa chọn nào.",
    ],
    sections: [
      {
        heading: "Thông tin anh chị/cô chú cung cấp",
        body: [
          "Khi anh chị/cô chú điền vào mẫu liên hệ, chúng tôi thu thập những thông tin anh chị/cô chú chọn chia sẻ: tên, số điện thoại, email, tên tiệm/quán, loại hình kinh doanh, và nội dung tin nhắn. Chúng tôi chỉ dùng thông tin này để trả lời và cung cấp dịch vụ mà anh chị/cô chú hỏi đến.",
        ],
      },
      {
        heading: "Thông tin chúng tôi tự động thu thập",
        body: [
          "Giống như hầu hết các trang web, chúng tôi thu thập dữ liệu sử dụng cơ bản khi anh chị/cô chú ghé — như các trang đã xem, loại thiết bị và trình duyệt, và vị trí gần đúng dựa trên địa chỉ IP. Chúng tôi dùng một công cụ phân tích tôn trọng quyền riêng tư (PostHog) để hiểu cách trang web được sử dụng và cải thiện nó. Điều này có thể dùng cookie hoặc công nghệ tương tự.",
        ],
      },
      {
        heading: "Cách chúng tôi dùng thông tin",
        body: [
          "Chúng tôi dùng thông tin thu thập được để trả lời anh chị/cô chú, cung cấp và cải thiện dịch vụ, giữ cho trang web hoạt động và an toàn, và hiểu nội dung nào hữu ích. Chúng tôi không bán thông tin cá nhân của anh chị/cô chú.",
        ],
      },
      {
        heading: "Chúng tôi chia sẻ với ai",
        body: [
          "Chúng tôi chỉ chia sẻ thông tin với các nhà cung cấp dịch vụ giúp chúng tôi hoạt động — ví dụ nhà cung cấp lưu trữ web (Netlify), công cụ phân tích (PostHog), và các công cụ email, tin nhắn chúng tôi dùng để trả lời. Những nhà cung cấp này chỉ được dùng thông tin để phục vụ cho chúng tôi. Chúng tôi cũng có thể tiết lộ thông tin nếu pháp luật yêu cầu.",
        ],
      },
      {
        heading: "Chúng tôi lưu giữ bao lâu",
        body: [
          "Chúng tôi lưu tin nhắn từ mẫu liên hệ trong thời gian cần thiết để trả lời và giữ hồ sơ kinh doanh, và lưu dữ liệu phân tích trong một khoảng thời gian giới hạn. Anh chị/cô chú có thể yêu cầu chúng tôi xóa thông tin bất kỳ lúc nào.",
        ],
      },
      {
        heading: "Lựa chọn và quyền của anh chị/cô chú",
        body: [
          "Anh chị/cô chú có thể yêu cầu xem, sửa, hoặc xóa thông tin cá nhân mà chúng tôi đang giữ. Anh chị/cô chú cũng có thể yêu cầu chúng tôi ngừng liên hệ. Để gửi yêu cầu, xin email đến studio@huybuilds.app và chúng tôi sẽ phản hồi trong thời gian hợp lý.",
        ],
      },
      {
        heading: "Quyền riêng tư của trẻ em",
        body: [
          "Trang web và dịch vụ của chúng tôi dành cho chủ doanh nghiệp và không hướng đến trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em.",
        ],
      },
      {
        heading: "Thay đổi chính sách",
        body: [
          "Chúng tôi có thể cập nhật chính sách này theo thời gian. Khi đó, chúng tôi sẽ sửa ngày “Cập nhật lần cuối” ở trên. Những thay đổi quan trọng sẽ được thể hiện trên trang này.",
        ],
      },
      {
        heading: "Liên hệ",
        body: [
          "Nếu anh chị/cô chú có câu hỏi về chính sách này hoặc về thông tin của mình, xin liên hệ LTH Apps LLC (HuyBuilds Studio) qua studio@huybuilds.app hoặc (425) 998-7191.",
        ],
      },
    ],
  },
};

export const TERMS: Record<StudioLang, LegalDoc> = {
  en: {
    title: "Terms of Service",
    updated: "Last updated: June 24, 2026",
    intro: [
      "These terms govern your use of the HuyBuilds Studio website and the services provided by LTH Apps LLC (“we,” “us,” or “our”). By using our website or hiring us, you agree to these terms.",
    ],
    sections: [
      {
        heading: "Our services",
        body: [
          "We provide website design, website hosting, and social media management for local businesses, on a month-to-month basis. The specific work included depends on the plan you choose and what we agree to with you directly.",
        ],
      },
      {
        heading: "Fees and payment",
        body: [
          "Monthly plans are billed on a recurring monthly basis. There is no long-term contract — you may cancel at any time, and your service will continue through the period you have already paid for. One-time or custom projects are quoted and agreed separately before work begins.",
        ],
      },
      {
        heading: "Your responsibilities",
        body: [
          "To do our best work, we rely on you to provide accurate information, business content (such as photos, text, and details), and timely approvals. You are responsible for the accuracy of the content you give us and for having the right to use it.",
        ],
      },
      {
        heading: "Ownership and content",
        body: [
          "When your account is in good standing, the finished website and content we create for your business are yours to use. Any photos, logos, text, or other materials you provide remain yours, and you grant us permission to use them to build and run your website and social media.",
        ],
      },
      {
        heading: "Cancellation and termination",
        body: [
          "You may cancel your monthly service at any time. We may suspend or end services if payment is overdue or if our terms are misused. On cancellation, hosting and social media management stop at the end of your paid period.",
        ],
      },
      {
        heading: "Disclaimers",
        body: [
          "We work hard to deliver quality results, but we cannot guarantee specific business outcomes such as a certain amount of traffic, customers, or revenue. Our services are provided on a reasonable-effort basis.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the fullest extent allowed by law, LTH Apps LLC is not liable for indirect or incidental damages arising from your use of our website or services. Our total liability for any claim will not exceed the amount you paid us in the three months before the claim.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the State of Washington, USA, without regard to its conflict-of-law rules.",
        ],
      },
      {
        heading: "Changes to these terms",
        body: [
          "We may update these terms from time to time. When we do, we will revise the “Last updated” date above. Continued use of our website or services means you accept the updated terms.",
        ],
      },
      {
        heading: "Contact us",
        body: [
          "Questions about these terms? Contact LTH Apps LLC (HuyBuilds Studio) at studio@huybuilds.app or (425) 998-7191.",
        ],
      },
    ],
  },
  vi: {
    title: "Điều Khoản Dịch Vụ",
    updated: "Cập nhật lần cuối: ngày 24 tháng 6, 2026",
    intro: [
      "Những điều khoản này áp dụng cho việc sử dụng trang web HuyBuilds Studio và các dịch vụ do công ty LTH Apps LLC (“chúng tôi”) cung cấp. Khi sử dụng trang web hoặc thuê chúng tôi, anh chị/cô chú đồng ý với những điều khoản này.",
    ],
    sections: [
      {
        heading: "Dịch vụ của chúng tôi",
        body: [
          "Chúng tôi cung cấp dịch vụ thiết kế website, lưu trữ website, và quản lý mạng xã hội cho các doanh nghiệp địa phương, theo từng tháng. Phần công việc cụ thể tùy thuộc vào gói anh chị/cô chú chọn và những gì chúng ta thỏa thuận trực tiếp.",
        ],
      },
      {
        heading: "Phí và thanh toán",
        body: [
          "Các gói hàng tháng được tính phí lặp lại mỗi tháng. Không có hợp đồng dài hạn — anh chị/cô chú có thể ngừng bất kỳ lúc nào, và dịch vụ sẽ tiếp tục đến hết kỳ đã thanh toán. Các dự án một lần hoặc theo yêu cầu riêng sẽ được báo giá và thỏa thuận riêng trước khi bắt đầu.",
        ],
      },
      {
        heading: "Trách nhiệm của anh chị/cô chú",
        body: [
          "Để làm tốt nhất, chúng tôi cần anh chị/cô chú cung cấp thông tin chính xác, nội dung kinh doanh (như hình ảnh, chữ viết, chi tiết), và phê duyệt kịp thời. Anh chị/cô chú chịu trách nhiệm về tính chính xác của nội dung cung cấp và về quyền sử dụng nội dung đó.",
        ],
      },
      {
        heading: "Quyền sở hữu và nội dung",
        body: [
          "Khi tài khoản của anh chị/cô chú đang trong tình trạng tốt, website và nội dung hoàn thiện chúng tôi tạo ra cho doanh nghiệp là của anh chị/cô chú. Mọi hình ảnh, logo, chữ viết hay tài liệu khác anh chị/cô chú cung cấp vẫn thuộc về anh chị/cô chú, và anh chị/cô chú cho phép chúng tôi dùng chúng để xây dựng và vận hành website cũng như mạng xã hội.",
        ],
      },
      {
        heading: "Ngừng và chấm dứt dịch vụ",
        body: [
          "Anh chị/cô chú có thể ngừng dịch vụ hàng tháng bất kỳ lúc nào. Chúng tôi có thể tạm ngừng hoặc chấm dứt dịch vụ nếu thanh toán quá hạn hoặc điều khoản bị lạm dụng. Khi ngừng, việc lưu trữ và quản lý mạng xã hội sẽ dừng vào cuối kỳ đã thanh toán.",
        ],
      },
      {
        heading: "Miễn trừ cam kết",
        body: [
          "Chúng tôi nỗ lực mang lại kết quả chất lượng, nhưng không thể bảo đảm những kết quả kinh doanh cụ thể như một lượng truy cập, khách hàng, hay doanh thu nhất định. Dịch vụ được cung cấp trên cơ sở nỗ lực hợp lý.",
        ],
      },
      {
        heading: "Giới hạn trách nhiệm",
        body: [
          "Trong phạm vi tối đa mà pháp luật cho phép, LTH Apps LLC không chịu trách nhiệm về các thiệt hại gián tiếp hoặc ngẫu nhiên phát sinh từ việc sử dụng trang web hoặc dịch vụ. Tổng trách nhiệm của chúng tôi cho bất kỳ khiếu nại nào sẽ không vượt quá số tiền anh chị/cô chú đã trả trong ba tháng trước đó.",
        ],
      },
      {
        heading: "Luật áp dụng",
        body: [
          "Những điều khoản này được điều chỉnh theo luật của Tiểu bang Washington, Hoa Kỳ.",
        ],
      },
      {
        heading: "Thay đổi điều khoản",
        body: [
          "Chúng tôi có thể cập nhật những điều khoản này theo thời gian. Khi đó, chúng tôi sẽ sửa ngày “Cập nhật lần cuối” ở trên. Việc tiếp tục sử dụng trang web hoặc dịch vụ nghĩa là anh chị/cô chú chấp nhận điều khoản mới.",
        ],
      },
      {
        heading: "Liên hệ",
        body: [
          "Có câu hỏi về những điều khoản này? Xin liên hệ LTH Apps LLC (HuyBuilds Studio) qua studio@huybuilds.app hoặc (425) 998-7191.",
        ],
      },
    ],
  },
};
