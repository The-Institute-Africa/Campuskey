import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  ArrowLeft,
  Home,
  ShieldCheck,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Layout/Header";
import {
  fetchProperties,
  approveProperty,
  fetchPropertyVerificationDocument,
} from "./api/admin.api";

const AdminProperties = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  const handleVerify = async (propertyId) => {
    try {
      const updatedProperty = await approveProperty(propertyId);
      setProperties((prev) =>
        prev.map((p) => (p.id === propertyId ? updatedProperty : p))
      );
      toast.success("Property verified successfully!");
    } catch {
      toast.error("Failed to verify property");
    }
  };

  const handleViewDocument = async (propertyId) => {
    const preview = window.open("about:blank", "_blank");
    if (!preview) {
      toast.error("Allow pop-ups to view verification documents");
      return;
    }

    try {
      const document = await fetchPropertyVerificationDocument(propertyId);
      const url = URL.createObjectURL(document);
      preview.opener = null;
      preview.location.href = url;
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      preview.close();
      toast.error("Failed to load verification document");
    }
  };

  const getStatusBadge = (status) => {
    if (!status) {
      return <Badge variant="outline">Not Submitted</Badge>;
    }

    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-success text-white">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="secondary">
            <XCircle className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-destructive text-white">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredProperties = (filter) => {
    switch (filter) {
      case "verified":
        return properties.filter(
          (p) => p.verification?.status === "APPROVED"
        );
      case "pending":
        return properties.filter(
          (p) => p.verification?.status === "PENDING"
        );
      default:
        return properties;
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link to="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Home className="h-6 w-6" /> Property Management
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <TabList className="flex gap-4 border-b mb-6">
            <Tab>All</Tab>
            <Tab>Verified</Tab>
            <Tab>Pending</Tab>
          </TabList>

          {["all", "verified", "pending"].map((filter, i) => (
            <TabPanel key={i}>
              <PropertyTable
                properties={filteredProperties(filter)}
                getStatusBadge={getStatusBadge}
                handleVerify={handleVerify}
                handleViewDocument={handleViewDocument}
              />
            </TabPanel>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

// ---------------- TABLE ----------------

const PropertyTable = ({ properties, getStatusBadge, handleVerify, handleViewDocument }) => (
  <div className="overflow-x-auto rounded-lg border bg-card">
    <table className="w-full border-collapse">
      <thead className="bg-muted sticky top-0 z-10">
        <tr className="text-left text-sm font-medium text-muted-foreground">
          <th className="px-4 py-3">Property</th>
          <th className="px-4 py-3">Location</th>
          <th className="px-4 py-3">Landlord</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Submitted</th>
          <th className="px-4 py-3">Verified</th>
          <th className="px-4 py-3 text-right">Action</th>
        </tr>
      </thead>

      <tbody>
        {properties.map((property) => (
          <tr
            key={property.id}
            className="border-t hover:bg-muted/50 transition"
          >
            <td className="px-4 py-3 font-medium">
              {property.name}
            </td>
            <td className="px-4 py-3">{property.location}</td>
            <td className="px-4 py-3">{property.landlord.name}</td>
            <td className="px-4 py-3">
              {getStatusBadge(property.verification?.status)}
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
              {property.verification?.submittedAt
                ? new Date(
                    property.verification.submittedAt
                  ).toLocaleDateString()
                : "—"}
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
              {property.verification?.verifiedAt
                ? new Date(
                    property.verification.verifiedAt
                  ).toLocaleDateString()
                : "—"}
            </td>
            <td className="px-4 py-3 text-right">
              {property.verification?.documentPath && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleViewDocument(property.id)}
                >
                  View Document
                </Button>
              )}
              {property.verification?.status === "PENDING" && (
                <Button
                  size="sm"
                  onClick={() => handleVerify(property.id)}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Verify
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {properties.length === 0 && (
      <div className="p-6 text-center text-muted-foreground">
        No properties found.
      </div>
    )}
  </div>
);

export default AdminProperties;
