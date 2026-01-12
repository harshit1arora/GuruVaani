import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { jsPDF } from "jspdf";
import Logo from "../components/Logo";

const Certificate = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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

    // Draw yellow background
    doc.setFillColor(255, 223, 89); // Yellow background
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Draw white certificate area with dashed border
    const certificateWidth = pageWidth - margin * 2;
    const certificateHeight = pageHeight - margin * 2;
    doc.setFillColor(255, 255, 255); // White certificate background
    doc.rect(margin, margin, certificateWidth, certificateHeight, "F");
    
    // Add dashed border
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.5);
    doc.setLineDashPattern([3, 3]);
    doc.rect(margin, margin, certificateWidth, certificateHeight);
    doc.setLineDashPattern([], 0); // Reset to solid line

    // Add blue circular logo at the top
    doc.setFillColor(52, 152, 219); // Blue circle
    doc.circle(pageWidth / 2, margin + 30, 25, "F");
    
    // Add ribbon symbol (using text as a simple representation)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255); // White text
    doc.text("🏆", pageWidth / 2, margin + 33, { align: "center" });

    // Add prestige text
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("PRESTIGIOUS AWARD", pageWidth / 2, margin + 60, { align: "center" });

    // Add certificate title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80); // Dark blue text
    doc.text("CERTIFICATE", pageWidth / 2, margin + 80, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(231, 76, 60); // Red text for achievement
    doc.text("OF ACHIEVEMENT", pageWidth / 2, margin + 95, { align: "center" });

    // Add certificate text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("This is to certify that", pageWidth / 2, margin + 115, { align: "center" });

    // Add recipient name with cursive-style font
    doc.setFont("courier", "bold italic");
    doc.setFontSize(28);
    doc.setTextColor(44, 62, 80);
    doc.text("Sunita Mishra", pageWidth / 2, margin + 135, { align: "center" });

    // Add certificate description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "has actively engaged in reflective classroom practice",
      pageWidth / 2, margin + 155, { align: "center" }
    );
    doc.text(
      "and continuous professional learning through the",
      pageWidth / 2, margin + 162, { align: "center" }
    );
    doc.text(
      "GuruVani Teaching Coach platform.",
      pageWidth / 2, margin + 169, { align: "center" }
    );

    // Add date and signature line
    doc.setDrawColor(150, 150, 150); // Gray border
    doc.setLineWidth(0.5);
    doc.line(margin + 20, margin + 195, pageWidth - margin - 20, margin + 195);

    // Add date and signature
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("January 2025", margin + 20, margin + 205);
    doc.text("GuruVani", pageWidth - margin - 20, margin + 205, { align: "right" });

    // Add red circular seal at bottom right
    doc.setFillColor(231, 76, 60); // Red seal
    doc.circle(pageWidth - margin - 25, margin + certificateHeight - 25, 15, "F");
    
    // Add seal text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("SEAL", pageWidth - margin - 25, margin + certificateHeight - 25, { align: "center" });

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
        <div className="bg-card rounded-xl border-2 border-primary/20 shadow-sm overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-primary/5 p-6 text-center border-b border-primary/10">
            <Logo size="sm" backgroundColor="bg-primary/10" textColor="text-primary" className="mx-auto mb-3" />
            <p className="text-xs text-primary uppercase tracking-widest font-medium">
              {t.login.appName}
            </p>
          </div>

          {/* Certificate Body */}
          <div className="p-6 text-center">
            <h2 className="text-lg font-bold text-foreground mb-2">
              {t.certificate.header}
            </h2>
            
            <p className="text-sm text-muted-foreground mb-6">
              {t.certificate.certify}
            </p>

            <p className="text-xl font-semibold text-primary mb-6">
              Sunita Mishra
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t.certificate.description}
            </p>

            <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border">
              <span>January 2025</span>
              <span>{t.login.appName}</span>
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
