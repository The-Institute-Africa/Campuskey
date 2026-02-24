import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

import {useAuth}   from '@/pages/auth/api/store/auth.store';

// Mock data - replace with actual backend messages later
const mockMessages = {
  "1": {
    studentName: "Alice Johnson",
    propertyName: "Campus View Apartment",
    thread: [
      {
        id: 1,
        sender: "student",
        text: "Hi! I'm interested in viewing this property. Is it still available?",
        time: "2 hours ago",
      },
      {
        id: 2,
        sender: "landlord",
        text: "Yes, it's still available! When would you like to schedule a viewing?",
        time: "1 hour ago",
      },
      {
        id: 3,
        sender: "student",
        text: "Great! How about this Saturday at 2pm?",
        time: "30 minutes ago",
      },
    ],
  },
  "2": {
    studentName: "Bob Smith",
    propertyName: "Downtown Studio",
    thread: [
      {
        id: 1,
        sender: "student",
        text: "Can you tell me more about the utilities included?",
        time: "1 day ago",
      },
    ],
  },
};

const MessageThread = () => {
  const { user} = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'Landlord') {
    navigate('/login');
    toast({
      title: "Access Denied",
      description: "You must be logged in as a landlord to view this page.",
      variant: "destructive"
    });
    return null;
  }

  const { messageId } = useParams();
  const [reply, setReply] = useState("");
  const conversation = mockMessages[messageId];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    toast.success("Message sent!");
    setReply("");
  };

  if (!conversation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Message not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link to="/landlord/messages">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {conversation.studentName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold">{conversation.studentName}</h1>
              <p className="text-sm text-muted-foreground">{conversation.propertyName}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="p-6">
          {/* Message Thread */}
          <div className="mb-6 max-h-[500px] space-y-4 overflow-y-auto">
            {conversation.thread.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "landlord" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    msg.sender === "landlord"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`mt-2 text-xs ${
                      msg.sender === "landlord"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your message..."
              rows={3}
            />
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default MessageThread;
