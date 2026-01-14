import { ArrowLeft, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { jsPDF } from "jspdf";
import Logo from "../components/Logo";
import { getProfile, Profile } from "@/lib/api";

const Certificate = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Function to download certificate as PDF
  const handleDownload = () => {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Set document margins
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Set background with blue geometric patterns (simplified representation)
    doc.setFillColor(255, 255, 255); // White background
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Add blue border design
    doc.setDrawColor(11, 115, 120); // Teal blue color
    doc.setLineWidth(1);
    doc.rect(margin - 5, margin - 5, pageWidth - (margin - 5) * 2, pageHeight - (margin - 5) * 2);

    // Add GuruVani logo placeholder (circle with text)
    doc.setFillColor(11, 115, 120); // Teal blue circle
    doc.circle(pageWidth / 2, margin + 25, 20, "F");
    
    // Add logo text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White text
    doc.text("GV", pageWidth / 2, margin + 28, { align: "center" });

    // Add certificate title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(11, 115, 120); // Teal blue text
    doc.text("CERTIFICATE", pageWidth / 2, margin + 60, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60); // Dark gray text
    doc.text("OF APPRECIATION", pageWidth / 2, margin + 75, { align: "center" });

    // Add recipient name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(60, 60, 60);
    doc.text(profile?.full_name || "Sunita Mishra", pageWidth / 2, margin + 110, { align: "center" });

    // Add certificate description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(
      "Your achievements highlight not only your hard work,",
      pageWidth / 2, margin + 135, { align: "center" }
    );
    doc.text(
      "but also your passion and commitment to continuous growth.",
      pageWidth / 2, margin + 142, { align: "center" }
    );
    doc.text(
      "May this milestone inspire even greater accomplishments ahead.",
      pageWidth / 2, margin + 149, { align: "center" }
    );

    // Add yellow ribbon icon
    doc.setFontSize(20);
    doc.setTextColor(255, 200, 0); // Yellow color
    doc.text("🏆", pageWidth / 2, margin + 175, { align: "center" });

    // Add signature lines and signatures
    doc.setDrawColor(150, 150, 150); // Gray border
    doc.setLineWidth(0.5);
    
    // Left signature line (Harshit Arora)
    doc.line(margin + 20, margin + 195, pageWidth / 2 - 20, margin + 195);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text("HARSHIT ARORA", margin + 20, margin + 205);
    doc.text("(GURUVAANI)", margin + 20, margin + 210);
    
    // Right signature line (Tejas Ranjeet)
    doc.line(pageWidth / 2 + 20, margin + 195, pageWidth - margin - 20, margin + 195);
    doc.text("TEJAS RANJEET", pageWidth - margin - 20, margin + 205, { align: "right" });
    doc.text("(GURUVAANI)", pageWidth - margin - 20, margin + 210, { align: "right" });

    // Add certificate ID and date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    doc.text(
      `CERTIFICATE ID: GV-TEACH-${new Date().getFullYear()}-000124 ISSUED ON: ${currentDate}`,
      pageWidth / 2, margin + 230, { align: "center" }
    );
    doc.text(
      "DIGITALLY GENERATED VIA GURUVAANI",
      pageWidth / 2, margin + 235, { align: "center" }
    );

    // Download the PDF
    doc.save("guruvani-certificate.pdf");
  };

  return (
    <div className="app-container pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground ml-2">
          {t.certificate.title}
        </h1>
      </header>

      {/* Certificate Preview */}
      <section className="px-5 mb-6 fade-in-up">
        <div className="bg-white rounded-xl border-2 border-[#0D7377]/20 shadow-sm overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-[#0D7377]/5 p-6 text-center border-b border-[#0D7377]/10">
            <div className="w-12 h-12 rounded-full bg-[#0D7377] flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">GV</span>
            </div>
            <p className="text-xs text-[#0D7377] uppercase tracking-widest font-medium">
              GURUVANI
            </p>
          </div>

          {/* Certificate Body */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-[#0D7377] mb-2">
              CERTIFICATE
            </h2>
            
            <h3 className="text-lg font-semibold text-gray-700 mb-8">
              OF APPRECIATION
            </h3>

            <p className="text-3xl font-bold text-gray-800 mb-8">
              {profile?.full_name || "Sunita Mishra"}
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mb-12 max-w-md mx-auto">
              Your achievements highlight not only your hard work, but also your passion and commitment to continuous growth. May this milestone inspire even greater accomplishments ahead.
            </p>

            {/* Ribbon Icon */}
            <div className="mb-10">
              <span className="text-4xl">🏆</span>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-700">HARSHIT ARORA</p>
                <p className="text-xs text-gray-500">(GURUVAANI)</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-700">TEJAS RANJEET</p>
                <p className="text-xs text-gray-500">(GURUVAANI)</p>
              </div>
            </div>

            {/* Certificate ID and Date */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>CERTIFICATE ID: GV-TEACH-2026-000124 ISSUED ON: 12 JAN 2026</p>
              <p>DIGITALLY GENERATED VIA GURUVAANI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-5 mb-6 fade-in-up-delay-1">
        <p className="text-sm text-muted-foreground text-center">
          {t.certificate.recognises}
        </p>
      </section>

      {/* Download Button */}
      <section className="px-5 fade-in-up-delay-2">
        <Button 
          className="w-full h-14 text-base font-semibold rounded-xl gap-2"
          onClick={handleDownload}
        >
          <Download className="w-5 h-5" />
          {t.certificate.download}
        </Button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Certificate;
