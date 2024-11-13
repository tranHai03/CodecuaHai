import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMotorcycle, faBicycle, faTachometerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './CusFilterOptions.css';
import xedethue from '../../assets/images/images_homePage/v994_9054.png';
import { useLocation } from 'react-router-dom';


const CusFilterOptions = () => {
    const [vehicleType, setVehicleType] = useState('');
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedStars, setSelectedStars] = useState([]); // Trạng thái lọc đánh giá
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const vehicles = [
        { id: 1, type: 'Xe máy', brand: 'Honda', name: 'Honda SH 150 ABS Đen Sần 12/2022 Siêu Lướt', rating: 2.5, image: xedethue, location: 'Hà Nội', distance: '50km', status: 'Xe mới', currentPrice: '1.400.000 VND/ngày', originalPrice: '1.800.000 VND', reviews: 120 },
        { id: 2, type: 'Xe đạp', brand: 'Trek', name: 'Trek 150', rating: 4.2, image: xedethue, location: 'Đà Nẵng', distance: '20km', status: 'Xe mới', currentPrice: '500.000 VND/ngày', originalPrice: '600.000 VND', reviews: 80 },
        // Thêm dữ liệu xe ở đây
    ];

    const handleStarFilterChange = (star) => {
        setSelectedStars(prev =>
            prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
        );
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedLocation = queryParams.get('location') || '';
    const selectedDates = queryParams.get('dates') ? queryParams.get('dates').split(',') : [];


    // Hàm định dạng số với dấu ','
    const formatNumberWithCommas = (value) => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Khi người dùng đang nhập liệu (onChange)
    const handleMinPriceChange = (e) => {
        // Loại bỏ dấu phẩy và cập nhật giá trị thô
        const rawValue = e.target.value.replace(/,/g, '');
        setMinPrice(rawValue);
    };

    const handleMaxPriceChange = (e) => {
        // Loại bỏ dấu phẩy và cập nhật giá trị thô
        const rawValue = e.target.value.replace(/,/g, '');
        setMaxPrice(rawValue);
    };

    // Khi người dùng rời khỏi trường input (onBlur)
    const handleMinPriceBlur = () => {
        setMinPrice(formatNumberWithCommas(minPrice));
    };

    const handleMaxPriceBlur = () => {
        setMaxPrice(formatNumberWithCommas(maxPrice));
    };

    const filteredVehicles = vehicles
        .filter((vehicle) => {
            // Chuyển đổi giá trị khoảng giá thành số nguyên để so sánh
            const parsedMinPrice = minPrice ? parseInt(minPrice.replace(/,/g, '')) : 0;
            const parsedMaxPrice = maxPrice ? parseInt(maxPrice.replace(/,/g, '')) : 0;
            const vehiclePrice = parseInt(vehicle.currentPrice.replace(/\D/g, ''));

            return (
                (vehicleType === '' || vehicle.type === vehicleType) &&
                (brand === '' || vehicle.brand === brand) &&
                (parsedMinPrice === 0 || vehiclePrice >= parsedMinPrice) &&
                (parsedMaxPrice === 0 || vehiclePrice <= parsedMaxPrice) &&
                (selectedStars.length === 0 || selectedStars.includes(Math.floor(vehicle.rating)))
            );
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return b.id - a.id;
            if (sortBy === 'priceAsc') return parseInt(a.currentPrice.replace(/\D/g, '')) - parseInt(b.currentPrice.replace(/\D/g, ''));
            if (sortBy === 'priceDesc') return parseInt(b.currentPrice.replace(/\D/g, '')) - parseInt(a.currentPrice.replace(/\D/g, ''));
            if (sortBy === 'ratingAsc') return a.rating - b.rating;
            if (sortBy === 'ratingDesc') return b.rating - a.rating;
            return 0;
        });

    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const VehicleCard = ({ data }) => (
        <Col lg={4} md={6} sm={12} className="mb-4">
            <Link to={`/ChiTietXe/${data.name}`} className="vehicle-card-link">
                <div className="card vehicle-card">
                    <div className="vehicle-image-wrapper">
                        <img src={data.image} alt={data.name} className="card-img-top vehicle-image" />
                    </div>
                    <div className="card-body vehicle-details">
                        <h5 className="card-title vehicle-name">{data.name}</h5>
                        <p className="card-text vehicle-price-section">
                            <span className="vehicle-current-price">{data.currentPrice}</span>
                            <span className="vehicle-original-price">{data.originalPrice}</span>
                        </p>
                        <p className="card-text vehicle-location">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> {data.location}
                        </p>
                        <div className="vehicle-footer d-flex justify-content-between">
                            <div className="vehicle-status">
                                <FontAwesomeIcon icon={data.type === 'Xe máy' ? faMotorcycle : faBicycle} className="status-icon" /> {data.status}
                                <span className="vehicle-distance">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="distance-icon" /> {data.distance}
                                </span>
                            </div>
                            <div className="vehicle-rating">
                                {Array(Math.floor(data.rating)).fill().map((_, index) => (
                                    <FontAwesomeIcon key={index} icon={faStar} className="vehicle-star" />
                                ))}
                                <span className="vehicle-review-count">({data.reviews})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Col>
    );


    return (
        <Container className="centered-container mt-4 mb-5">
            <h1 className="my-4 text-center">Thông tin </h1>
            <h2>Thông tin tìm kiếm</h2>
            <p>Địa điểm: {selectedLocation}</p>
            <p>Thời gian: {selectedDates.join(' - ')}</p>
            <Row>
                <Col md={3} className="mb-4">
                    <div className="filter-container">
                        <h2 className="filter-title">Lọc Đánh Giá</h2>
                        <Form className="filter-form">
                            <Form.Group controlId="rating" className="filter-group">
                                <Form.Label>Đánh Giá</Form.Label>
                                <div className="rating-checkboxes">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <Form.Check
                                            key={star}
                                            type="checkbox"
                                            id={`filter-star-${star}`}
                                            label={<span className="text-warning">{star} <FontAwesomeIcon icon={faStar} /></span>}
                                            onChange={() => handleStarFilterChange(star)}
                                            checked={selectedStars.includes(star)}
                                            className="filter-star"
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>

                <Col md={9}>
                    <Row className="mb-4 filter-row">
                        {/* Sắp xếp các bộ lọc theo chiều ngang */}
                        <Col xs={6} md={3}>
                            <Form.Group controlId="vehicleType" className="filter-group">
                                <Form.Label>Loại Xe</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={vehicleType}
                                    onChange={(e) => setVehicleType(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">Tất cả</option>
                                    <option value="Xe máy">Xe máy</option>
                                    <option value="Xe đạp">Xe đạp</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={3}>
                            <Form.Group controlId="brand" className="filter-group">
                                <Form.Label>Thương Hiệu</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập thương hiệu"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="filter-input"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={3}>
                            <Form.Group controlId="price" className="filter-group">
                                <Form.Label>Khoảng Giá</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Thấp nhất"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        onBlur={handleMinPriceBlur}
                                        className="filter-input price-input"
                                    />
                                    <span className="px-2">-</span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Cao nhất"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        onBlur={handleMaxPriceBlur}
                                        className="filter-input price-input"
                                    />
                                </div>
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={3}>
                        <Form.Group controlId="sortBy" className="filter-group">
                                <Form.Label>Sắp Xếp Theo</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="priceAsc">Giá: Thấp đến Cao</option>
                                    <option value="priceDesc">Giá: Cao đến Thấp</option>
                                    <option value="ratingAsc">Sao: Thấp đến Cao</option>
                                    <option value="ratingDesc">Sao: Cao đến Thấp</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                    </Row>

                    {/* Thẻ Xe */}
                    <Row>
                        {currentItems.map((vehicle) => (
                            <VehicleCard key={vehicle.id} data={vehicle} />
                        ))}
                    </Row>

                    {/* Phân Trang */}
                    <div className="pagination-container">
                        <Button
                            variant="outline-primary"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            Trước
                        </Button>
                        <span className="pagination-info">Trang {currentPage} của {totalPages}</span>
                        <Button
                            variant="outline-primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            Tiếp
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CusFilterOptions;
