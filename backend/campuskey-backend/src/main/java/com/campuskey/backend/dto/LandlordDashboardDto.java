package com.campuskey.backend.dto;

public class LandlordDashboardDto {
        private long totalListings;
        private long newListingsThisMonth;
        private long totalViews;
        private double averageRating;
        private double listingGrowth;

        public LandlordDashboardDto(
                long totalListings,
                long newListingsThisMonth,
                long totalViews,
                double averageRating,
                double listingGrowth
        ) {
            this.totalListings = totalListings;
            this.newListingsThisMonth = newListingsThisMonth;
            this.totalViews = totalViews;
            this.averageRating = averageRating;
            this.listingGrowth = listingGrowth;
        }

        public long getTotalListings() {
            return totalListings;
        }

        public long getNewListingsThisMonth() {
            return newListingsThisMonth;
        }

        public long getTotalViews() {
            return totalViews;
        }

        public double getAverageRating() {
            return averageRating;
        }

        public double getListingGrowth() {
            return listingGrowth;
        }


}
