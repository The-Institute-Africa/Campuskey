import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { toast } from "sonner";
import {useAuth}   from '@/pages/auth/api/store/auth.store';
import {addProperty} from './api/landlord.api';

const AddProperty = () => {
  const navigate = useNavigate();
  const {token} = useAuth();

    const [formData, setFormData] = useState({
    name: "",
    address: "",
    university: "",
    distance: "",
    deposit: "",
    studentsPerRoom: "",
    price: "",
    propertyType: "",
    description: "",
    location: "",
  });

    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [currentStudentsPerRoom, setCurrentStudentsPerRoom] = useState("");

  const [amenities, setAmenities] = useState([]);
  const [currentAmenity, setCurrentAmenity] = useState("");

  const [utilities, setUtilities] = useState([]);
  const [currentUtility, setCurrentUtility] = useState("");

  const [rules, setRules] = useState([]);
  const [currentRule, setCurrentRule] = useState("");

  const addAmenity = () => {
    if (currentAmenity.trim() && !amenities.includes(currentAmenity.trim())) {
      setAmenities([...amenities, currentAmenity.trim()]);
      setCurrentAmenity("");
    }
  };

  const removeAmenity = (amenity) => {
    setAmenities(amenities.filter((a) => a !== amenity));
  };

  const addUtility = () => {
    if (currentUtility.trim() && !utilities.includes(currentUtility.trim())) {
      setUtilities([...utilities, currentUtility.trim()]);
      setCurrentUtility("");
    }
  };

  const removeUtility = (utility) => {
    setUtilities(utilities.filter((u) => u !== utility));
  };

  const addRule = () => {
    if (currentRule.trim() && !rules.includes(currentRule.trim())) {
      setRules([...rules, currentRule.trim()]);
      setCurrentRule("");
    }
  };

  const removeRule = (rule) => {
    setRules(rules.filter((r) => r !== rule));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error("Please upload at least one property image.");
            return;
        }

        const form = new FormData();

        // ✅ Basic fields
        form.append("name", formData.name);
        form.append("address", formData.address);
        form.append("university", formData.university);
        form.append("distanceFromCampus", formData.distance);
        form.append("propertyDeposit", formData.deposit);
        form.append("price", formData.price);
        form.append("propertyType", formData.propertyType);
        form.append("description", formData.description);
        form.append("location", formData.location);

        // ✅ Students per room (assuming single number or small array)
        formData.studentsPerRoom.forEach((num, index) =>
            form.append(`studentsPerRoom[${index}]`, num)
        );

        // ✅ Amenities / Utilities / Rules
        amenities.forEach((a, i) => form.append(`amenities[${i}].name`, a));
        utilities.forEach((u, i) => form.append(`utilities[${i}].name`, u));
        rules.forEach((r, i) => form.append(`rules[${i}].description`, r));

        // ✅ Media
        images.forEach((img) => form.append("pictures", img));
        videos.forEach((vid) => form.append("videos", vid));

        try {
          
            await addProperty(form, token);
            toast.success("Property information saved!");
            navigate("landlord");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save property. Please try again.");
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
          <h1 className="text-2xl font-bold">Add New Property</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Basic Information</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Campus View Apartment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, propertyType: value })
                    }
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="room">Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Full address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location Coordinates</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Latitude, Longitude (optional)"
                />
              </div>
            </div>

            {/* University Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">University Details</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="university">Nearest University *</Label>
                  <Input
                    id="university"
                    required
                    value={formData.university}
                    onChange={(e) =>
                      setFormData({ ...formData, university: e.target.value })
                    }
                    placeholder="e.g., State University"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distance">Distance from Campus *</Label>
                  <Input
                    id="distance"
                    required
                    value={formData.distance}
                    onChange={(e) =>
                      setFormData({ ...formData, distance: e.target.value })
                    }
                    placeholder="e.g., 0.5 miles"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Pricing</h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit ($) *</Label>
                  <Input
                    id="deposit"
                    type="number"
                    required
                    value={formData.deposit}
                    onChange={(e) =>
                      setFormData({ ...formData, deposit: e.target.value })
                    }
                    placeholder="800"
                  />
                </div>

                  <div className="space-y-2">
                      <Label htmlFor="studentsPerRoom">Students per Room *</Label>
                      <div className="flex gap-2">
                          <Input
                              id="studentsPerRoom"
                              type="number"
                              value={currentStudentsPerRoom || ""}
                              onChange={(e) => setCurrentStudentsPerRoom(e.target.value)}
                              placeholder="e.g., 1, 2, 4"
                          />
                          <Button
                              type="button"
                              onClick={() => {
                                  const val = parseInt(currentStudentsPerRoom, 10);
                                  if (!isNaN(val) && !formData.studentsPerRoom.includes(val)) {
                                      setFormData({
                                          ...formData,
                                          studentsPerRoom: [...formData.studentsPerRoom, val],
                                      });
                                      setCurrentStudentsPerRoom("");
                                  }
                              }}
                          >
                              Add
                          </Button>
                      </div>

                      {formData.studentsPerRoom.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                              {formData.studentsPerRoom.map((num, i) => (
                                  <div
                                      key={i}
                                      className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                                  >
                                      <span>{num} per room</span>
                                      <button
                                          type="button"
                                          onClick={() =>
                                              setFormData({
                                                  ...formData,
                                                  studentsPerRoom: formData.studentsPerRoom.filter((_, j) => j !== i),
                                              })
                                          }
                                          className="hover:text-destructive"
                                      >
                                          ×
                                      </button>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>

              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={currentAmenity}
                    onChange={(e) => setCurrentAmenity(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAmenity();
                      }
                    }}
                    placeholder="e.g., WiFi, Parking, Gym"
                  />
                  <Button type="button" onClick={addAmenity} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                      >
                        <span>{amenity}</span>
                        <button
                          type="button"
                          onClick={() => removeAmenity(amenity)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Utilities */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Utilities Included</h2>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={currentUtility}
                    onChange={(e) => setCurrentUtility(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addUtility();
                      }
                    }}
                    placeholder="e.g., Water, Electricity, Internet"
                  />
                  <Button type="button" onClick={addUtility} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {utilities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {utilities.map((utility) => (
                      <div
                        key={utility}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                      >
                        <span>{utility}</span>
                        <button
                          type="button"
                          onClick={() => removeUtility(utility)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <div className="space-y-2">
                <Label htmlFor="description">Property Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your property..."
                  rows={4}
                />
              </div>
            </div>

            {/* Rules */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Property Rules</h2>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={currentRule}
                    onChange={(e) => setCurrentRule(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addRule();
                      }
                    }}
                    placeholder="e.g., No smoking, No pets"
                  />
                  <Button type="button" onClick={addRule} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {rules.length > 0 && (
                  <div className="space-y-2">
                    {rules.map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border bg-card p-3"
                      >
                        <span className="text-sm">{rule}</span>
                        <button
                          type="button"
                          onClick={() => removeRule(rule)}
                          className="hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Photos & Videos</h2>
              <div className="space-y-4">
                  <div className="space-y-2">
                      <Label>Property Images *</Label>
                      <input
                          type="file"
                          multiple
                          accept="image/png, image/jpeg"
                          onChange={(e) => setImages([...e.target.files])}
                          className="hidden"
                          id="imageUpload"
                      />
                      <label
                          htmlFor="imageUpload"
                          className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-border p-12 transition-colors hover:border-primary"
                      >
                          <div className="text-center">
                              <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                              <p className="mb-2 text-sm font-medium">Click to upload images</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                          </div>
                      </label>

                      {images.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                              {Array.from(images).map((file, index) => (
                                  <div key={index} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                                      <span>{file.name}</span>
                                      <button
                                          type="button"
                                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                                          className="ml-1 hover:text-destructive"
                                      >
                                          <X className="h-3 w-3" />
                                      </button>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>


                  <div className="space-y-2">
                      <Label>Property Videos (Optional)</Label>
                      <input
                          type="file"
                          multiple
                          accept="video/mp4, video/mov"
                          onChange={(e) => setVideos([...e.target.files])}
                          className="hidden"
                          id="videoUpload"
                      />
                      <label
                          htmlFor="videoUpload"
                          className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-border p-12 transition-colors hover:border-primary"
                      >
                          <div className="text-center">
                              <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                              <p className="mb-2 text-sm font-medium">Click to upload videos</p>
                              <p className="text-xs text-muted-foreground">MP4, MOV up to 50MB</p>
                          </div>
                      </label>

                      {videos.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                              {Array.from(videos).map((file, index) => (
                                  <div key={index} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                                      <span>{file.name}</span>
                                      <button
                                          type="button"
                                          onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                                          className="ml-1 hover:text-destructive"
                                      >
                                          <X className="h-3 w-3" />
                                      </button>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>

              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Continue to Document Upload
              </Button>
              <Link to="/landlord" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default AddProperty;
