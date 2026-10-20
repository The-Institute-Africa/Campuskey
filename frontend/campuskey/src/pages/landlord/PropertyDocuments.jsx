import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, X, FileText } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import {useAuth}   from '@/pages/auth/api/store/auth.store';
import { projectSendVerification } from "./api/propertyVerification.api";

const PropertyDocuments = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const {token} = useAuth();

  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (documents.length === 0) {
    toast.error("Please upload at least one property document");
    return;
  }

  try {
    for (const file of documents) {
      await projectSendVerification({
        propertyId,
        file,
        token
      });
    }

    toast.success("Documents submitted for verification!");
    navigate("/landlord");
  } catch (error) {
    console.error(error);
    toast.error("Failed to submit documents");
  }
};


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link to="/landlord">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Submit Property Documents</h1>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Property Verification Documents
                </h2>
                <p className="text-muted-foreground text-sm">
                  Please upload official property documents for verification
                  (ownership proof, lease agreements, etc.)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Upload Documents *</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-colors hover:border-primary">
                  <label className="cursor-pointer text-center">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">
                      Click to upload documents
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG up to 10MB each
                    </p>
                  </label>
                </div>
              </div>

              {documents.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Documents ({documents.length})</Label>
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border bg-card p-3"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDocument(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              Submit Documents
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default PropertyDocuments;
