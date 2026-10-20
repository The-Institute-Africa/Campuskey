import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";


const AdminMessaging = () => {
  const [recipients, setRecipients] = useState({
    allUsers: false,
    landlords: false,
    students: false,
  });

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("email");

  const handleSend = (e) => {
    e.preventDefault();

    const selectedRecipients = Object.entries(recipients)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (selectedRecipients.length === 0) {
      toast.error("Please select at least one recipient group");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    toast.success(
      `${messageType === "email" ? "Email" : "WhatsApp message"} sent successfully!`
    );

    setSubject("");
    setMessage("");
    setRecipients({ allUsers: false, landlords: false, students: false });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Send Messages</h1>
        </div>
      </header>

      {/* Main Form */}
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <Card className="p-6">
          <form onSubmit={handleSend} className="space-y-6">
            {/* Message Type */}
            <div className="space-y-2">
              <Label>Message Type</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={messageType === "email" ? "default" : "outline"}
                  onClick={() => setMessageType("email")}
                  className="flex-1"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={messageType === "whatsapp" ? "default" : "outline"}
                  onClick={() => setMessageType("whatsapp")}
                  className="flex-1"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Recipients */}
            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allUsers"
                    checked={recipients.allUsers}
                    onCheckedChange={(checked) =>
                      setRecipients({ ...recipients, allUsers: checked })
                    }
                  />
                  <Label htmlFor="allUsers" className="cursor-pointer">
                    All Users
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="landlords"
                    checked={recipients.landlords}
                    onCheckedChange={(checked) =>
                      setRecipients({ ...recipients, landlords: checked })
                    }
                  />
                  <Label htmlFor="landlords" className="cursor-pointer">
                    Landlords Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="students"
                    checked={recipients.students}
                    onCheckedChange={(checked) =>
                      setRecipients({ ...recipients, students: checked })
                    }
                  />
                  <Label htmlFor="students" className="cursor-pointer">
                    Students Only
                  </Label>
                </div>
              </div>
            </div>

            {/* Subject (only for email) */}
            {messageType === "email" && (
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                  required
                />
              </div>
            )}

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  messageType === "email"
                    ? "Enter your email message..."
                    : "Enter your WhatsApp message..."
                }
                rows={8}
                required
              />
            </div>

            {/* Send Button */}
            <Button type="submit" className="w-full" size="lg">
              <Send className="mr-2 h-5 w-5" />
              Send {messageType === "email" ? "Email" : "WhatsApp Message"}
            </Button>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Messages will be sent to all users in the
            selected groups.
            {messageType === "whatsapp" &&
              " Make sure users have opted in to receive WhatsApp messages."}
          </p>
        </Card>
      </main>
    </div>
  );
};

export default AdminMessaging;
